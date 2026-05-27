<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">

    <div class="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 w-[1000px] h-[720px] p-12 relative flex flex-col transition-all">

      <RouterLink to="/" class="absolute top-8 right-8 text-gray-300 hover:text-gray-500 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </RouterLink>

      <h2 class="text-3xl font-extrabold text-gray-900 text-center mt-2 mb-8">
        创建你的新账号
      </h2>

      <div class="flex flex-1 border-t border-gray-100 pt-8">

        <div class="flex-1 flex flex-col items-center justify-center px-10 text-center bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-150/50">
          <div class="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-lg mb-6">
            <span class="text-white text-5xl font-black italic">d</span>
          </div>
          <h3 class="text-2xl font-black text-gray-800 mb-3">欢迎加入抖音</h3>
          <p class="text-gray-400 text-sm max-w-[240px] leading-relaxed">
            分享美好生活，探索更大的世界，发现更有趣的灵魂。
          </p>
        </div>

        <div class="w-px bg-gray-100 mx-4"></div>

        <div class="flex-1 px-10 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex gap-8 mb-2 text-lg font-bold text-gray-950 border-b border-gray-100 pb-2">
              <span>账号注册</span>
            </div>

            <div class="bg-gray-100 rounded-2xl p-3.5 flex items-center gap-4">
              <input
                v-model="username"
                type="text"
                placeholder="请设置用户名 (1-20位)"
                class="flex-1 bg-transparent text-base focus:outline-none placeholder:text-gray-300 text-gray-950"
              />
            </div>

            <div class="bg-gray-100 rounded-2xl p-3.5 flex items-center gap-4">
              <input
                v-model="telephone"
                type="tel"
                placeholder="请输入手机号"
                class="flex-1 bg-transparent text-base focus:outline-none placeholder:text-gray-300 text-gray-950"
              />
            </div>

            <div class="bg-gray-100 rounded-2xl p-3.5 flex items-center gap-4">
              <input
                v-model="email"
                type="email"
                placeholder="请输入电子邮箱"
                class="flex-1 bg-transparent text-base focus:outline-none placeholder:text-gray-300 text-gray-950"
              />
            </div>

            <div class="bg-gray-100 rounded-2xl p-3.5">
              <input
                v-model="password"
                type="password"
                placeholder="请设置登录密码 (6-50位)"
                class="w-full bg-transparent text-base focus:outline-none placeholder:text-gray-300 text-gray-950"
              />
            </div>

            <div class="bg-gray-100 rounded-2xl p-3.5">
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="请再次输入密码以确认"
                class="w-full bg-transparent text-base focus:outline-none placeholder:text-gray-300 text-gray-950"
              />
            </div>
          </div>

          <div class="mt-4">
            <button
              @click="handleRegister"
              :disabled="isRegisterDisabled"
              :class="[
                'w-full text-center text-xl font-bold text-white py-4 rounded-2xl mb-4 transition',
                isRegisterDisabled ? 'bg-dy-red/50 cursor-not-allowed' : 'bg-dy-red hover:bg-dy-red/90'
              ]"
            >
              立即注册
            </button>

            <div class="text-center text-sm text-gray-500">
              已有账号？
              <RouterLink to="/login" class="text-dy-red font-bold hover:underline">返回登录</RouterLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import request from '../utils/request'; // 使用之前封装好的工业级请求中间件

const router = useRouter();

// 1. 根据后端结构体定义对应的扁平响应式数据
const username = ref('');
const telephone = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// 2. 按钮禁用逻辑：必须所有输入框都有数据才可以点击
const isRegisterDisabled = computed(() => {
  return !username.value || !telephone.value || !email.value || !password.value || !confirmPassword.value;
});

// 3. 注册行为处理
const handleRegister = async () => {
  if (isRegisterDisabled.value) return;

  // 前端第一防线：校验两次密码一致性
  if (password.value !== confirmPassword.value) {
    alert('两次输入的密码不一致，请检查！');
    return;
  }

  // 4. 打包 Payload：字段键名严格对齐你的 Go Struct JSON 标签
  const payload = {
    username: username.value,
    password: password.value,
    email: email.value,
    telephone: telephone.value
  };

  try {
    // 请求打向路由：POST /api/v1/user/base/register
    await request.post('/register', payload);
    // 如果剥离出来的业务状态码是 200（或者根据你后端的约定）
    alert('注册成功！正在为您跳转到登录页');
    router.push('/'); // 丝滑切回登录页
  } catch (error) {
    console.error('注册中转站捕获到异常:', error);
  }
};
</script>
