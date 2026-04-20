import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Comment, Pagination, Reaction, Reply, Topic } from './forum.schema'
import { INTERNAL_API_URL } from './consts'

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({
    baseUrl: INTERNAL_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Topic', 'Comment', 'Reply', 'Reaction'],
  endpoints: builder => ({
    getTopics: builder.query<Topic[], void>({
      query: () => '/topics',
      providesTags: ['Topic'],
    }),

    getTopicById: builder.query<Topic, number>({
      query: id => `/topics/${id}`,
      providesTags: (result, error, id) => [{ type: 'Topic', id }],
    }),

    createTopic: builder.mutation<Topic, { title: string; content: string }>({
      query: body => ({
        url: '/topics',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Topic'],
    }),

    deleteTopic: builder.mutation<void, number>({
      query: id => ({
        url: `/topics/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Topic'],
    }),
    getComments: builder.query<Pagination<Comment>, number>({
      query: topicId => `/topics/${topicId}/comments`,
      providesTags: (result, error, topicId) => [
        { type: 'Comment', id: topicId },
      ],
    }),

    getCommentById: builder.query<Comment, number>({
      query: id => `/comments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Comment', id }],
    }),
    createComment: builder.mutation<Comment, { topicId: number; text: string }>(
      {
        query: ({ topicId, text }) => ({
          url: `/topics/${topicId}/comments`,
          method: 'POST',
          body: { text },
        }),
        invalidatesTags: (result, error, { topicId }) => [
          { type: 'Comment', id: topicId },
        ],
      }
    ),
    deleteComment: builder.mutation<void, number>({
      query: id => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
    getReplies: builder.query<Pagination<Reply>, number>({
      query: commentId => `/comments/${commentId}/replies`,
      providesTags: (result, error, commentId) => [
        { type: 'Reply', id: commentId },
      ],
    }),

    getReplyById: builder.query<Reply, number>({
      query: id => `/replies/${id}`,
      providesTags: (result, error, id) => [{ type: 'Reply', id }],
    }),

    createReply: builder.mutation<
      Reply,
      { commentId: number; text: string; parentReplyId?: number }
    >({
      query: ({ commentId, ...body }) => ({
        url: `/comments/${commentId}/replies`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { commentId }) => [
        { type: 'Reply', id: commentId },
      ],
    }),

    deleteReply: builder.mutation<void, number>({
      query: id => ({
        url: `/replies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reply'],
    }),
    getReactions: builder.query<
      Pagination<Reaction>,
      { targetType: 'comment' | 'reply'; targetId: number }
    >({
      query: ({ targetType, targetId }) =>
        `/reactions?targetType=${targetType}&targetId=${targetId}`,
      providesTags: (result, error, { targetId }) => [
        { type: 'Reaction', id: targetId },
      ],
    }),
    setReaction: builder.mutation<
      Reaction,
      { targetType: 'comment' | 'reply'; targetId: number; emoji: string }
    >({
      query: body => ({
        url: '/reactions',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { targetId }) => [
        { type: 'Reaction', id: targetId },
      ],
    }),
    deleteReaction: builder.mutation<
      void,
      { targetType: 'comment' | 'reply'; targetId: number }
    >({
      query: body => ({
        url: '/reactions',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: (result, error, { targetId }) => [
        { type: 'Reaction', id: targetId },
      ],
    }),
  }),
})

export const {
  useGetTopicsQuery,
  useGetTopicByIdQuery,
  useCreateTopicMutation,
  useDeleteTopicMutation,

  useGetCommentsQuery,
  useGetCommentByIdQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,

  useGetRepliesQuery,
  useGetReplyByIdQuery,
  useCreateReplyMutation,
  useDeleteReplyMutation,

  useGetReactionsQuery,
  useSetReactionMutation,
  useDeleteReactionMutation,
} = forumApi
