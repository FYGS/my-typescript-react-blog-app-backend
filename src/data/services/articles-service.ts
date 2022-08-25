import { Request, Response } from "express";
import { Db } from 'mongodb'

export namespace ArticlesService {
  export const findByName = async (db: Db, request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
    const { name } = request.params;

    try {
      const articleInfo = await db.collection('articles').findOne({ name });

      if (articleInfo === null) {
        return response.status(404).json('Article not found');
      }

      return response.status(200).json(articleInfo);
    } catch (error: any) {
      return response.status(500).json({
        message: `Error occurred while getting article ${name}`,
        error: error.message,
      });
    }
  };

  export const addComment = async (db: Db, request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
    const { name } = request.params;
    const { username, text } = request.body;

    try {
      const articleInfo = await db.collection('articles').findOne({ name });

      if (articleInfo === null) {
        return response.status(404).json('Article not found');
      }

      await db.collection('articles').updateOne(
        { name },
        {
          $set: {
            comments: [...articleInfo.comments, { username, text }],
          },
        },
      );
      const updatedArticleInfo = await db
        .collection('articles')
        .findOne({ name });

      return response.status(200).json(updatedArticleInfo);
    } catch (error: any) {
      return response.status(500).json({
        message: `Error occurred while updating article ${name}`,
        error: error.message,
      });
    }
  };

  export const upvote = async (db: Db, request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
    const { name } = request.params;

    try {
      const articleInfo = await db.collection('articles').findOne({ name });

      if (articleInfo === null) {
        return response.status(404).json('Article not found');
      }

      await db.collection('articles').updateOne(
        { name },
        {
          $set: {
            upvotes: articleInfo.upvotes + 1,
          },
        },
      );
      const updatedArticleInfo = await db
        .collection('articles')
        .findOne({ name });

      return response.status(200).json(updatedArticleInfo);
    } catch (error: any) {
      return response.status(500).json({
        message: `Error occurred while updating article ${name}`,
        error: error.message,
      });
    }
  };
}
