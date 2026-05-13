<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">

    <div class="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 w-[1000px] h-[650px] p-12 relative flex flex-col">

      <button class="absolute top-8 right-8 text-gray-300 hover:text-gray-500 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 class="text-3xl font-extrabold text-gray-900 text-center mt-6 mb-12">
        登录后免费畅享高清视频
      </h2>

      <div class="flex flex-1 border-t border-gray-100 pt-10">

        <div class="flex-1 flex flex-col items-center px-10 text-center">
          <h3 class="text-xl font-bold text-gray-800 mb-8">扫码登录</h3>

          <div class="bg-white p-2 border border-gray-100 rounded-3xl shadow-lg shadow-gray-100 mb-8 relative">
            <img
              src="../../public/img.png"
              alt="Scan QR Code"
              class="w-56 h-56 rounded-2xl"
            />
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-12 h-12 bg-black rounded-full border-4 border-white flex items-center justify-center shadow-md">
                    <span class="text-white text-2xl font-black">d</span>
                </div>
            </div>
          </div>

          <p class="text-gray-500 text-sm mb-12">
            打开<span class="text-dy-red">「抖音APP」</span>点击左上角<span class="inline-block mx-1">≡</span>扫一扫
          </p>

          <button class="bg-gray-100 text-gray-600 text-sm px-6 py-2 rounded-full hover:bg-gray-200 transition">
            如何扫码
          </button>
        </div>

        <div class="w-px bg-gray-100 mx-4"></div>

        <div class="flex-1 px-10">

          <div class="flex gap-8 mb-10 text-lg border-b border-gray-100 pb-3">
            <button
              @click="activeTab = 'code'"
              :class="['font-bold pb-2', activeTab === 'code' ? 'text-gray-950 border-b-4 border-gray-950' : 'text-gray-400']"
            >
              验证码登录
            </button>
            <button
              @click="activeTab = 'password'"
              :class="['font-bold pb-2', activeTab === 'password' ? 'text-gray-950 border-b-4 border-gray-950' : 'text-gray-400']"
            >
              密码登录
            </button>
          </div>

          <div v-if="activeTab === 'code'" class="space-y-6">

            <div class="bg-gray-100 rounded-2xl p-4 flex items-center gap-4">
              <div class="flex items-center gap-1 text-gray-700">
                <span>+86</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                v-model="phone"
                type="tel"
                placeholder="请输入手机号"
                class="flex-1 bg-transparent text-lg focus:outline-none placeholder:text-gray-300 text-gray-950"
              />
            </div>

            <div class="bg-gray-100 rounded-2xl p-4 flex items-center justify-between">
              <input
                v-model="code"
                type="text"
                placeholder="请输入验证码"
                class="bg-transparent text-lg focus:outline-none placeholder:text-gray-300 text-gray-950"
              />
              <button class="text-lg font-medium text-gray-400 hover:text-gray-600">
                获取验证码
              </button>
            </div>
          </div>

          <div v-else class="space-y-6">
            <div class="bg-gray-100 rounded-2xl p-4">
              <input type="text" placeholder="手机号/邮箱/抖音号" class="w-full bg-transparent text-lg focus:outline-none" />
            </div>
            <div class="bg-gray-100 rounded-2xl p-4">
              <input type="password" placeholder="密码" class="w-full bg-transparent text-lg focus:outline-none" />
            </div>
          </div>

          <button
            @click="handleLogin"
            :disabled="isLoginDisabled"
            :class="[
              'w-full text-center text-xl font-bold text-white py-5 rounded-2xl mt-12 mb-8 transition',
              isLoginDisabled ? 'bg-dy-red/50 cursor-not-allowed' : 'bg-dy-red hover:bg-dy-red/90'
            ]"
          >
            登录
          </button>

          <div class="text-center text-sm text-gray-500">
            登录即代表同意 <a href="#" class="text-dy-red hover:underline">用户协议</a> 和 <a href="#" class="text-dy-red hover:underline">隐私政策</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 1. 定义页面的状态
const activeTab = ref('code'); // 当前激活的 Tab ('code' 或 'password')
const phone = ref('');         // 用户输入的手机号
const code = ref('');          // 用户输入的验证码

// 2. 计算属性：判断登录按钮是否应该禁用
// 只有当两个输入框都有内容时，按钮才变亮（模仿抖音的原型逻辑）
const isLoginDisabled = computed(() => {
  return !phone.value || !code.value;
});

// 3. 登录逻辑处理
const handleLogin = () => {
  if (isLoginDisabled.value) return;

  // 这里封装你发给后端的 JSON
  const payload = {
    method: activeTab.value,
    phone: phone.value,
    code: code.value,
  };

  console.log('向 Go 后端发送登录请求:', payload);
  // axios.post('/api/login', payload).then(...)
};
</script>

<style scoped>

</style>
