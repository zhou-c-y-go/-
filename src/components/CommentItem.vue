<template>
  <div class="comment-item">
    <div class="flex items-start gap-3 mb-4">
      <img :src="comment.userAvatar || 'https://via.placeholder.com/40'" class="w-10 h-10 rounded-full bg-gray-200" />

      <div class="flex-1">
        <div class="text-sm text-gray-500 font-bold">{{ comment.userName || '匿名用户' }}</div>
        <div class="text-base text-gray-800 mt-1">{{ comment.content }}</div>

        <div class="text-xs text-gray-400 mt-2 cursor-pointer hover:text-blue-500" @click="handleReply(comment)">
          回复
        </div>
      </div>
    </div>

    <div v-if="comment.children && comment.children.length > 0" class="ml-10 border-l-2 border-gray-100 pl-4">
      <CommentItem
        v-for="child in comment.children"
        :key="child.ID"
        :comment="child"
        @reply="emitUpward"
      />
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, toRefs} from 'vue';

// 接收父组件（或上一级自己）传过来的当前评论对象
const props = defineProps({
  comment: Object,
});
const { comment } = toRefs(props)
const emit = defineEmits(['reply']);

// 点击回复时，把当前评论对象一层层传到最外层去处理
const handleReply = (targetComment) => {
  emit('reply', targetComment);
};

// 中继传递：把孙子的回复事件传递给爷爷
const emitUpward = (targetComment) => {
  emit('reply', targetComment);
};
</script>
