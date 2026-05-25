<template>
  <div class="min-h-screen bg-[#161823] text-white flex flex-col font-sans select-none">

    <header class="h-16 border-b border-gray-800 bg-[#161823] sticky top-0 z-50 flex items-center justify-between px-6">
      <div class="flex items-center space-x-2 text-xl font-bold tracking-wider text-red-500">
        🎵 <span class="text-white">抖音精选</span>
      </div>
      <div class="w-1/3 flex items-center bg-[#2f3142] rounded-full px-4 py-1.5 border border-transparent focus-within:border-gray-500">
        <input type="text" placeholder="搜索你感兴趣的内容" class="bg-transparent w-full outline-none text-sm text-gray-200 placeholder-gray-500"/>
        <button class="text-gray-400 hover:text-white text-sm px-2">🔍 搜索</button>
      </div>

      <div class="flex items-center space-x-4">

        <div v-if="isLoginIn" class="relative group cursor-pointer flex items-center">
          <img
            :src="userAvatar"
            alt="avatar"
            class="w-8 h-8 rounded-full border border-gray-600 group-hover:border-gray-300 transition-all object-cover"
          />

          <div class="absolute right-0 top-full pt-2 w-32 hidden group-hover:block z-50">
            <div class="bg-[#2f3142] rounded-md shadow-lg border border-gray-700 overflow-hidden">
              <div class="px-4 py-3 text-sm text-gray-200 hover:text-white hover:bg-gray-600 transition-colors" @click="goToProfile">
                👤 个人主页
              </div>
              <div class="px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-gray-600 transition-colors border-t border-gray-700" @click="handleLogout">
                🚪 退出登录
              </div>
            </div>
          </div>
        </div>

        <button
          v-else
          class="bg-red-500 hover:bg-red-600 px-5 py-1.5 rounded-md text-sm font-medium transition-all"
          @click="goToLogin"
        >
          登录
        </button>
      </div>

    </header>

    <div class="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden">

      <aside class="w-60 border-r border-gray-800 bg-[#161823] overflow-y-auto p-4 flex flex-col justify-between hidden md:flex">
        <div class="space-y-6">
          <div class="space-y-1">
            <div class="flex items-center space-x-3 bg-gray-800 px-4 py-3 rounded-lg cursor-pointer text-red-400 font-medium">🏠 <span>精选</span></div>
            <div class="flex items-center space-x-3 hover:bg-gray-900 px-4 py-3 rounded-lg cursor-pointer text-gray-400 hover:text-white transition">✨ <span>推荐</span></div>
            <div class="flex items-center space-x-3 hover:bg-gray-900 px-4 py-3 rounded-lg cursor-pointer text-gray-400 hover:text-white transition">🤖 <span>AI 搜索</span></div>
          </div>
          <hr class="border-gray-800"/>
          <div class="space-y-1 text-gray-400 text-sm">
            <div class="px-4 py-2 hover:text-white cursor-pointer">👥 关注</div>
            <div class="px-4 py-2 hover:text-white cursor-pointer">🤝 朋友</div>
            <div class="px-4 py-2 hover:text-white cursor-pointer">👤 我的</div>
          </div>
        </div>
        <div class="bg-[#2f3142] p-3 rounded-xl text-center space-y-2 text-xs">
          <p class="text-gray-300">客户端看视频更方便</p>
          <button class="w-full bg-emerald-500 py-1.5 rounded-lg font-bold">下载 APP</button>
        </div>
      </aside>

      <main class="flex-1 overflow-y-auto bg-[#060716] p-6 space-y-6">

        <div class="flex items-center space-x-4 overflow-x-auto whitespace-nowrap scrollbar-none text-sm text-gray-400 pb-2">
          <span class="text-white font-medium bg-gray-800 px-3 py-1 rounded-full cursor-pointer">全部</span>
          <span v-for="tag in ['公开课', '游戏', '二次元', '音乐', '影视', '美食', '知识']" :key="tag" class="hover:text-white cursor-pointer px-1 py-1">{{ tag }}</span>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div class="xl:col-span-2 bg-black rounded-xl overflow-hidden aspect-video relative group border border-gray-900 flex flex-col justify-end p-6">
            <img src="https://picsum.photos/800/450" class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten" alt="player-placeholder"/>

            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/30 cursor-pointer">
              <span class="text-5xl">▶️</span>
            </div>

            <div class="relative z-10 space-y-2">
              <h2 class="text-lg font-bold">沉浸式体验 40分钟肩颈放松 好好享受吧</h2>
              <p class="text-sm text-gray-300">@小韩爱洗头（皮皮护理）· 1天前</p>
              <div class="text-xs text-blue-400 flex space-x-2">
                <span>#解压</span><span>#助眠</span><span>#asmr</span>
              </div>
            </div>
          </div>

          <div class="space-y-4 max-h-[450px] overflow-y-auto pr-1">
            <div v-for="i in 3" :key="i" class="flex space-x-3 bg-[#161823] p-2 rounded-lg hover:bg-gray-900 cursor-pointer transition">
              <div class="w-32 h-20 bg-gray-800 rounded overflow-hidden flex-shrink-0 relative">
                <img :src="`https://picsum.photos/150/100?random=${i}`" class="w-full h-full object-cover" alt="thumb"/>
                <span class="absolute bottom-1 right-1 bg-black/60 text-[10px] px-1 rounded">40:00</span>
              </div>
              <div class="flex flex-col justify-between text-xs py-0.5">
                <p class="font-medium line-clamp-2 text-gray-200">41分钟周杰伦🎵合集【戴好耳机开听】</p>
                <p class="text-gray-500">@Bobaya · 3.8万赞</p>
              </div>
            </div>
          </div>

        </div>

        <div>
          <h3 class="text-md font-bold mb-4 flex items-center">🔥 热门精选</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="item in 4" :key="item" class="bg-[#161823] rounded-lg overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all">
              <div class="aspect-video bg-gray-800 relative">
                <img :src="`https://picsum.photos/300/200?random=${item+10}`" class="w-full h-full object-cover" alt="grid-img"/>
                <span class="absolute bottom-2 left-2 text-xs font-semibold bg-black/40 px-2 py-0.5 rounded-full">👍 10.2万</span>
              </div>
              <div class="p-3 text-xs space-y-1">
                <p class="font-medium text-gray-200 truncate">OK了老铁们，带你看点不一样的！</p>
                <p class="text-gray-500">@一口气看完AI · 4天前</p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script setup>
import { useRouter } from 'vue-router';
import {onMounted, ref} from "vue";
const router = useRouter()
const isLoginIn = ref(false)
const userAvatar = ref('https://api.dicebear.com/7.x/adventurer/svg?seed=Felix')
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    isLoginIn.value = true
    //TODO 如果你登录时把头像也存进了 localStorage，可以在这里取出来
    // const savedAvatar = localStorage.getItem('avatar')
    // if (savedAvatar) userAvatar.value = savedAvatar
  }
})
const goToLogin = async () => {
  await router.push('/login')
}

// 推出逻辑
const handleLogout = () => {
  // 清除本地存储的 Token 和其他用户数据
  localStorage.removeItem('token')
  localStorage.removeItem('expired_at')
  isLoginIn.value = false

  alert('已成功退出登录！')
  // 退出后不一定要跳走，留在首页即可，因为首页是对外公开的
}

const goToProfile = async () => {
  await router.push('/center')
}
</script>
