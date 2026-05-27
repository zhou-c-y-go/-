<template>
  <div class="min-h-screen bg-[#161823] text-[#ffffff] flex flex-col font-sans select-none">

    <header class="h-16 w-full border-b border-gray-800 bg-[#161823]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      <div class="text-gray-500 text-sm font-mono">// 🚀 Top Navbar Placeholder (未来功能预留)</div>
      <div class="flex items-center space-x-4">
        <img :src="userInfo.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix'"
       class="w-8 h-8 rounded-full object-cover border border-gray-700 shadow-md transform hover:scale-105 transition duration-200 cursor-pointer"
       alt="Navbar Avatar" />
      </div>
    </header>

    <div class="flex flex-1 w-full max-w-[1400px] mx-auto">

      <aside class="w-52 border-r border-gray-800 py-3 hidden md:block select-none">
        <div class="space-y-1">
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="handleMenuClick(item.id)"
            :class="activeMenu === item.id
              ? 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-500 border-l-[3px] border-pink-500 font-bold'
              : 'text-gray-400 hover:bg-gray-800/30 hover:text-gray-200 border-l-[3px] border-transparent'"
            class="w-full h-10 flex items-center space-x-2.5 px-3 rounded-r-lg transition-all duration-150 text-xs font-medium group active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-[18px] w-[18px] transition-colors duration-200"
                 :class="activeMenu === item.id ? 'text-pink-500' : 'text-gray-400 group-hover:text-gray-200'"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
            </svg>
            <span class="tracking-wide">{{ item.name }}</span>
          </button>
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
            <button class="pb-3 text-gray-500 hover:text-gray-300 transition">喜欢 ()</button>
            <button class="pb-3 text-gray-500 hover:text-gray-300 transition">收藏 ()</button>
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

            <div class="flex flex-col items-center mb-6">
              <div class="relative group w-20 h-20 cursor-pointer" @click="triggerFileInput">
                <div class="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <img :src="editForm.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix'"
                     class="w-20 h-20 rounded-full object-cover border-2 border-pink-500/80 shadow-inner" alt="Preview" />
                <div v-if="isUploading" class="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center z-20 backdrop-blur-xs">
                  <span class="text-[10px] text-pink-400 font-mono tracking-widest animate-pulse">上传中...</span>
                </div>
              </div>
              <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleAvatarUpload" />
              <span class="text-[11px] text-gray-400 mt-2">点击上方圆圈更换头像</span>
            </div>

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
import { ref, reactive, onMounted } from 'vue'
import request from '@/utils/request.js'
import router from "@/router/index.js"; //

// 用户信息存储
const userInfo = ref({
  username: '',
  avatar: '',
  gender: '',
  signature: '',
  following: 0,
  followers: 0,
  total_liked: 0,
})

const worksList = ref([])

// 弹窗与上传状态管理
const isModalOpen = ref(false)
const isUploading = ref(false) // 控制“上传中...”的全局遮罩
const fileInput = ref(null)

// 💡 核心改动 1：新增一个变量，用来死死按住用户选中的本地文件对象，绝不提前触发网络请求！
const selectedFile = ref(null)

const editForm = reactive({
  username: '',
  gender: '',
  signature: '',
  avatar: ''
})

// 拉取个人资料（保持原本封装好的高可用逻辑）
const fetchUserProfile = async () => {
  try {
    const res = await request.get('/profile')
    if (res && res.code === 1 && res.data) {
      const { username, avatar, signature, total_liked, work_count, favorite_count, gender } = res.data
      userInfo.value.username = username
      userInfo.value.avatar = avatar
      userInfo.value.signature = signature
      userInfo.value.total_liked = total_liked
      userInfo.value.gender = gender
      userInfo.value.work_count = work_count || 0
      userInfo.value.favorite_count = favorite_count || 0
    }
  } catch (error) {
    console.error("加载个人空间信息失败啦:", error)
  }
}

onMounted(() => {
  fetchUserProfile()
})

const triggerFileInput = () => {
  if (isUploading.value) return
  fileInput.value.click()
}

// 💡 核心改动 2：修改选择文件的回调 —— 此时【零网络请求】，纯靠浏览器黑魔法做本地伪装预览！
const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 后端防爆红线前置拦截：超过 5MB 直接当场拦截
  if (file.size > 5 * 1024 * 1024) {
    alert('上传失败：头像图片大小不能超过 5MB')
    return
  }

  // 1. 把真正的文件体锁进暂存区，等最终按保存按钮时再发射！
  selectedFile.value = file

  // 2. 🔑 魔法行：利用浏览器原生的 URL.createObjectURL 产生一个本地临时虚拟路径
  // 它不需要经过任何网络传输，就能让 <img> 标签瞬间渲染出这张本地图片给用户看！
  editForm.avatar = URL.createObjectURL(file)
}

// 打开弹窗并深拷贝数据
const openEditModal = () => {
  editForm.username = userInfo.value.username
  editForm.gender = userInfo.value.gender
  editForm.signature = userInfo.value.signature
  editForm.avatar = userInfo.value.avatar
  isModalOpen.value = true
}

// 💡 核心改动 3：关闭弹窗时，必须打扫战场，释放暂存的文件
const closeEditModal = () => {
  isModalOpen.value = false
  // 释放 URL 内存碎片，并清空暂存文件，防止下次打开时被污染
  if (selectedFile.value && editForm.avatar.startsWith('blob:')) {
    URL.revokeObjectURL(editForm.avatar)
  }
  selectedFile.value = null
}

// 💡 核心改动 4：当用户最终点击【确定保存】时，串行编排所有上传事务！
const handleUpdateProfile = async () => {
  try {
    isUploading.value = true // 全局拉起静默等待小圆圈

    // 🔥 事务第一步：检查有没有被扣留在暂存区的“待上传头像”
    if (selectedFile.value) {
      console.log('🚀 监测到新头像变更，正在将其抛投至后端的 MinIO 存储桶...')
      const formData = new FormData()
      formData.append('head-img', selectedFile.value) // 严格对齐后端的 c.FormFile("head-img")

      // 轰炸你的后端 UploadHeaderImage 接口
      const uploadRes = await request.post('/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      // 如果头像在桶里落盘大翻车，立即熔断终止后续的基本资料更新，保护系统一致性
      if (!uploadRes || uploadRes.code !== 1) {
        alert('安全警报：新头像上传 MinIO 失败，保存事务已紧急熔断！')
        return
      }
      console.log('✅ 头像成功落盘并清除脏缓存，准备执行第二步基本资料持久化...')
    }

    // 🔥 事务第二步：头像顺利突围后（或者用户压根没换头像），开始发起更新文本资料的 PUT 请求
    const res = await request.put('/update', {
      username: editForm.username,
      gender: editForm.gender,
      signature: editForm.signature
    })

    // 🔥 事务第三步：两道防线全线飘绿，宣布全栈大功告成！
    if (res && res.code === 1) {
      // 一口气回源刷新，把最新的文本和 MinIO 链接统统刷新到主页
      await fetchUserProfile()

      alert('恭喜宝宝！个人资料及全新头像全套无感修改成功！')
      closeEditModal()
    }
  } catch (error) {
    console.error("更新资料全链路事务遭遇滑铁卢：", error)
  } finally {
    isUploading.value = false // 关闭全局等待状态
  }
}

// 新增 1：锁定当前处于激活状态的菜单，由于当前在个人中心页，默认高亮 'profile'
const activeMenu = ref('profile')

// 新增 2：定制大厂短视频平台最核心的 4 大功能蓝图（内嵌精美原生 SVG 路径）
const menuItems = ref([
  {
    id: '',
    name: '首页推荐',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  {
    id: 'following',
    name: '我的关注',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    id: 'publish',
    name: '发布精选',
    icon: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 'center',
    name: '个人中心',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  }
])

// 新增 3：点击侧边栏的切换事件调度中心
const handleMenuClick = (menuId) => {
  activeMenu.value = menuId

  // TODO：未来引入 vue-router 路由后，直接解开下面这行的注释，打通全站页面跳转！
  router.push(`/${menuId}`)

  console.log(`🔗 前端已成功捕捉到点击事件！正在准备切流至功能区: [${menuId}]`)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
