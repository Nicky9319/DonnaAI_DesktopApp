import React, { useState } from 'react';

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#121317]">
            <div className="grid md:grid-cols-2 gap-0 w-full max-w-4xl bg-[#1D1F24] rounded-xl shadow-2xl overflow-hidden">
                {/* Image Section */}
                <div className="hidden md:block relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/80 to-[#0EA5E9]/80"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1568952433726-3896e3881c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                        alt="Authentication" 
                        className="object-cover h-full w-full"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-[#F9FAFB] p-8 backdrop-blur-sm">
                        <div className="p-6 bg-[#1D1F24]/40 rounded-2xl backdrop-blur-md border border-[#F9FAFB]/10 mb-4">
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" 
                                alt="AgentBed Logo" 
                                className="w-20 h-20 drop-shadow-lg"
                            />
                        </div>
                        <h2 className="text-3xl font-bold mb-3 text-[#F9FAFB]">AgentBed</h2>
                        <p className="text-center text-lg font-light text-[#F9FAFB]/90 max-w-xs">
                            Your ultimate platform for managing intelligent agents
                        </p>
                    </div>
                </div>
                
                {/* Auth Form Section */}
                <div className="p-8 md:p-12">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-[#F9FAFB]">
                            {isSignIn ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-[#9CA3AF] mt-2">
                            {isSignIn ? 'Sign in to continue to AgentBed' : 'Join the AgentBed community today'}
                        </p>
                    </div>
                    
                    {/* Google Sign In Button */}
                    <button
                        className="w-full flex items-center justify-center gap-2 bg-[#1D1F24] border border-[#9CA3AF]/30 rounded-lg py-3 px-4 text-[#F9FAFB] hover:bg-[#282A30] mb-6 transition-all duration-300 shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                        </svg>
                        Sign in with Google
                    </button>
                    
                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-[#9CA3AF]/20"></div>
                        <span className="px-3 text-[#9CA3AF] text-sm">OR</span>
                        <div className="flex-grow border-t border-[#9CA3AF]/20"></div>
                    </div>
                    
                    {/* Email/Password Form */}
                    <form>
                        <div className="mb-4">
                            <label className="block text-[#F9FAFB] text-sm font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3 bg-[#282A30] border border-[#9CA3AF]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent text-[#F9FAFB] placeholder-[#9CA3AF]/50"
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Your email address"
                                    required
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-[#F9FAFB] text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-[#282A30] border border-[#9CA3AF]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent text-[#F9FAFB]"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        {!isSignIn && (
                            <div className="mb-6">
                                <label className="block text-[#F9FAFB] text-sm font-medium mb-2" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-[#282A30] border border-[#9CA3AF]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent text-[#F9FAFB]"
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        required
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {isSignIn && (
                            <div className="flex justify-end mb-6">
                                <a href="#" className="text-sm text-[#0EA5E9] hover:text-[#0EA5E9]/80 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        )}
                        
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#6366F1] to-[#0EA5E9] text-[#F9FAFB] py-3 px-4 rounded-lg hover:from-[#6366F1]/90 hover:to-[#0EA5E9]/90 transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-opacity-50 shadow-lg transform hover:-translate-y-0.5"
                        >
                            {isSignIn ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>
                    
                    {/* Toggle between sign in and sign up */}
                    <div className="text-center mt-8">
                        <p className="text-[#9CA3AF]">
                            {isSignIn ? "Don't have an account?" : "Already have an account?"}
                            <button 
                                onClick={() => setIsSignIn(!isSignIn)}
                                className="ml-1 text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium transition-colors"
                            >
                                {isSignIn ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;