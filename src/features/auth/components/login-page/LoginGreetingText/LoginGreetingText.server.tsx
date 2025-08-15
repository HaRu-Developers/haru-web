const LoginGreetingText = () => {
  return (
    <div className="flex w-full flex-col items-start">
      {/* 이모티콘 사이즈는 text size를 따라감 */}
      <span className="w-36pxr h-36pxr text-36pxr flex items-center justify-center">👋</span>
      <span className="text-login-register-page-greetings mr-10pxr text-black">
        HaRu에 오신 것을 환영해요!
      </span>
      {/* TODO: 타이포그래피 임의 적용되었음 */}
      <span className="text-b1-rg mr-6pxr text-gray-200">HaRu와 함께 하루를 시작해 볼까요?</span>
    </div>
  );
};

export default LoginGreetingText;
