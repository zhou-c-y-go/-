<template>
  <div class="comment-section p-6 bg-white rounded-lg shadow-sm">
    <h3 class="text-xl font-bold mb-6">视频评论区</h3>

    <div class="mb-8 flex gap-4">
      <input
        v-model="newCommentText"
        :placeholder="replyTarget ? `回复 @${replyTarget.userName}` : '留下你的精彩评论...'"
        class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button @click="submitComment" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        发送
      </button>
      <button v-if="replyTarget" @click="replyTarget = null" class="text-gray-400 hover:text-gray-600">取消回复</button>
    </div>

    <div v-if="treeData.length > 0">
      <CommentItem
        v-for="rootComment in treeData"
        :key="rootComment.ID"
        :comment="rootComment"
        @reply="setReplyTarget"
      />
    </div>
    <div v-else class="text-center text-gray-400 py-10">
      暂无评论，快来抢沙发吧~
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CommentItem from './CommentItem.vue';
import { buildCommentTree } from '../utils/tree.js'; // 引入刚才的算法

const rawData = ref([]); // 后端返回的扁平数据
const treeData = ref([]); // 转换后的树状数据
const newCommentText = ref('');
const replyTarget = ref(null); // 当前正在回复谁

// 模拟从你的 Go 后端获取数据
const fetchComments = async () => {
  // 实际开发中这里是 axios.get('/api/comments?video_id=1')
  // 这里用假数据模拟后端传回来的扁平物化路径数据
  const mockBackendData = [
    { ID: 1, userName: '老王', content: '这视频太硬核了！', path: '1/' },
    { ID: 2, userName: '小明', content: '确实，学到了。', path: '1/2/' },
    { ID: 3, userName: '杠精', content: '我觉得一般般吧。', path: '3/' },
    { ID: 4, userName: '路人甲', content: '@小明 真的吗？', path: '1/2/4/' }
  ];

  rawData.value = mockBackendData;
  treeData.value = buildCommentTree(mockBackendData); // 核心：转为树！
};

// 设置要回复的目标
const setReplyTarget = (comment) => {
  replyTarget.value = comment;
};

// 提交评论给 Go 后端
const submitComment = async () => {
  if (!newCommentText.value) return;

  const payload = {
    content: newCommentText.value,
    video_id: 1, // 当前视频 ID
    // 如果是在回复别人，需要把对方的 path 和 ID 传给后端，方便后端拼接新 path
    parent_id: replyTarget.value ? replyTarget.value.ID : null,
    parent_path: replyTarget.value ? replyTarget.value.path : ''
  };

  console.log('发给后端的 JSON:', payload);
  // axios.post('/api/comments', payload).then(...)

  // 模拟发送成功并清空
  newCommentText.value = '';
  replyTarget.value = null;
  // 重新拉取评论刷新页面 fetchComments();
};

onMounted(() => {
  fetchComments();
});
</script>
