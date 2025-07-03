import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './models/comment.model';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getAllComments(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async getSingleComment(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async createComment(
    payload: CreateCommentDto,
  ): Promise<{ message: string; new_comment: Comment }> {
    const new_comment = this.commentRepository.create({
      text: payload.text,
      user_id: payload.user_id,
      product_id: payload.product_id,
    });
    await this.commentRepository.save(new_comment);

    return {
      message: 'Comment created successfully!',
      new_comment,
    };
  }

  async updateComment(
    id: number,
    payload: UpdateCommentDto,
  ): Promise<{ message: string; updatedComment: Comment }> {
    const comment = await this.getSingleComment(id);
    const updatedComment = this.commentRepository.merge(comment, payload);
    await this.commentRepository.save(updatedComment);

    return {
      message: 'Comment updated successfully',
      updatedComment,
    };
  }

  async deleteComment(id: number): Promise<{ message: string }> {
    const comment = await this.getSingleComment(id);
    await this.commentRepository.remove(comment);

    return {
      message: 'Comment deleted successfully',
    };
  }
}