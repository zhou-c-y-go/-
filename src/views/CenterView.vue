<template>
  <div class="min-h-screen bg-[#161823] text-[#ffffff] flex flex-col font-sans select-none">

    <header class="h-16 w-full border-b border-gray-800 bg-[#161823]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      <div class="text-gray-500 text-sm font-mono">// 🚀 Top Navbar Placeholder (未来功能预留)</div>
      <div class="flex items-center space-x-4">
        <span class="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></span>
      </div>
    </header>

    <div class="flex flex-1 w-full max-w-[1400px] mx-auto">

      <aside class="w-64 border-r border-gray-800 p-4 hidden md:block">
        <div class="space-y-4">
          <div class="text-gray-500 text-sm font-mono mb-6">// 📂 Sidebar Placeholder</div>
          <div v-for="i in 4" :key="i" class="h-10 bg-gray-800/40 rounded-lg animate-pulse w-full"></div>
        </div>
      </aside>

      <main class="flex-1 p-6 md:p-8 overflow-y-auto">

        <section class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 pb-8 border-b border-gray-800">
          <div class="relative group cursor-pointer">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <img :src="userInfo.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix'"
                 class="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-[#161823]" alt="Avatar" />
          </div>

          <div class="flex-1 text-center md:text-left space-y-3">
            <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <h2 class="text-2xl font-bold tracking-wide">{{ userInfo.username }}</h2>
              <span :class="userInfo.gender === '男' ? 'bg-blue-500/20 text-blue-400' : 'bg-pink-500/20 text-pink-400'"
                    class="px-2 py-0.5 text-xs rounded-full font-medium">
                {{ userInfo.gender }}
              </span>
            </div>

            <p class="text-gray-400 text-sm max-w-md">{{ userInfo.signature || '这个人很懒，什么都没有留下~' }}</p>

            <div class="flex items-center justify-center md:justify-start space-x-6 pt-2 text-sm">
              <div><span class="font-bold text-lg text-gray-100">{{ userInfo.following }}</span> <span class="text-gray-400 ml-1">关注</span></div>
              <div><span class="font-bold text-lg text-gray-100">{{ userInfo.followers }}</span> <span class="text-gray-400 ml-1">粉丝</span></div>
              <div><span class="font-bold text-lg text-gray-100">{{ userInfo.total_liked }}</span> <span class="text-gray-400 ml-1">获赞</span></div>
            </div>
          </div>

          <div class="pt-4 md:pt-0">
            <button @click="openEditModal"
                    class="px-5 py-2 bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all rounded-md text-sm font-medium border border-gray-700 shadow-lg">
              编辑用户资料
            </button>
          </div>
        </section>

        <section class="pt-6">
          <div class="flex space-x-8 border-b border-gray-800/60 mb-6 text-sm">
            <button class="pb-3 border-b-2 border-pink-500 font-medium text-gray-100">作品 ({{ worksList.length }})</button>
            <button class="pb-3 text-gray-500 hover:text-gray-300 transition cursor-not-allowed">喜欢 (0)</button>
            <button class="pb-3 text-gray-500 hover:text-gray-300 transition cursor-not-allowed">收藏 (0)</button>
          </div>

          <div v-if="worksList.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="work in worksList" :key="work.id" class="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden relative group cursor-pointer">
              <img :src="work.cover_url" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <div class="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-xs">
                <span class="truncate pr-2">{{ work.title }}</span>
                <span class="text-pink-500 font-bold">❤️ {{ work.like_count }}</span>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col items-center justify-center py-20 text-gray-500 space-y-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 stroke-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9l-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p class="text-sm tracking-widest">暂无内容，快去发布你的第一个精选视频吧！</p>
          </div>
        </section>

      </main>
    </div>

    <transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeEditModal"></div>

        <div class="bg-[#252733] border border-gray-700 rounded-xl w-full max-w-md p-6 relative z-10 shadow-2xl transform transition-all scale-100">
          <h3 class="text-xl font-bold mb-6 text-center tracking-wide">修改个人资料</h3>

          <form @submit.prevent="handleUpdateProfile" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">用户名</label>
              <input v-model="editForm.username" type="text" class="w-full bg-[#161823] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-pink-500 transition" required />
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">性别</label>
              <select v-model="editForm.gender" class="w-full bg-[#161823] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-pink-500 transition">
                <option value="男">男</option>
                <option value="女">女</option>
                <option value="保密">保密</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">个性签名</label>
              <textarea v-model="editForm.signature" rows="3" class="w-full bg-[#161823] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-pink-500 transition resize-none" placeholder="介绍一下你自己吧..."></textarea>
            </div>

            <div class="flex space-x-3 pt-4">
              <button type="button" @click="closeEditModal" class="flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition">取消</button>
              <button type="submit" class="flex-1 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-md text-sm font-medium transition active:scale-95 shadow-lg">保存修改</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 💡 模拟从 Golang 后端用我们要传递的 Context & TraceID 获取到的用户信息
const userInfo = ref({
  username: '',
  avatar: '',
  gender: '',
  signature: '',
  following: 0,
  followers: 0,
  total_liked: 0,
})

// 💡 模拟作品列表（如果想测试“暂无内容”，直接把数组清空 `[]` 即可）
const worksList = ref([])

// 弹窗状态管理
const isModalOpen = ref(false)
const editForm = reactive({
  username: '',
  gender: '',
  signature: ''
})

// 打开弹窗并深拷贝一份数据到表单，防止未点击保存就污染原状态
const openEditModal = () => {
  editForm.username = userInfo.value.username
  editForm.gender = userInfo.value.gender
  editForm.signature = userInfo.value.signature
  isModalOpen.value = true
}

const closeEditModal = () => {
  isModalOpen.value = false
}

// 💡 提交修改资料：未来在这里发起 Axios 请求，对接我们的 Go 接口
const handleUpdateProfile = () => {
  
  // 模拟成功响应后更新本地状态
  userInfo.value.username = editForm.username
  userInfo.value.gender = editForm.gender
  userInfo.value.signature = editForm.signature

  // 可以在此处打印全链路 TraceID，完美契合后端调试需求
  console.log('Profile updated. TraceId trace log simulated.')
  closeEditModal()
}
</script>

<style scoped>
/* 丝滑的淡入淡出动画过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
