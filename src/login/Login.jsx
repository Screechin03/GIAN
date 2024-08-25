import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Auth/firebase'; // Adjust the path to your firebaseConfig.js
import { useNavigate } from 'react-router-dom';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secretCode, setSecretCode] = useState(''); // Add a state for the secret code
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const adminSecretCode = '312'; // Replace with your actual secret code
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSecretCode(''); // Reset secret code on form toggle
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');

      // Check if the secret code matches for admin login
      if (secretCode === adminSecretCode) {
        navigate('/login/main'); // Redirect to admin dashboard
      } else {
        navigate('/login'); // Redirect to user page
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user);

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        createdAt: new Date(),
      });
      console.log('User data added to Firestore');
      
      alert('Sign up successful!');
      navigate('/'); // Redirect to user page after sign-up
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden">
        <div className="w-1/2 p-8">
          <img src="/assets/gian.png" alt="gian" className="w-24 h-12"/>
          <p className="mb-6 text-gray-600">
            {isLogin ? 'Please enter your account details' : 'Create a new account'}
          </p>

          <form onSubmit={isLogin ? handleLogin : handleSignUp}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm mb-2">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Johndoe@gmail.com"
                className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm mb-2">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm mb-2">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Secret code input field */}
            {isLogin && (
              <div className="mb-4">
                <label htmlFor="secretCode" className="block text-sm mb-2">Admin Secret Code</label>
                <input
                  type="password"
                  id="secretCode"
                  placeholder="Enter admin secret code (optional)"
                  className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                />
              </div>
            )}

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              disabled={loading}
            >
              {loading ? (isLogin ? 'Signing In...' : 'Signing Up...') : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>

            <div className="text-center mt-6">
              <a
                href="#"
                className="text-green-500"
                onClick={toggleForm}
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
              </a>
            </div>
          </form>
        </div>

        <div className="w-1/2 bg-green-100 p-8 text-gray-700 relative flex items-center justify-center">
          <div className="max-w-xs text-center">
            <h2 className="text-2xl font-bold mb-6">
              {isLogin ? "What's our Jobseekers Said." : "Join us and get started!"}
            </h2>
            <p className="text-sm mb-8">
              {isLogin ? '"Search and find your dream job is now easier than ever. Just browse a job and apply if you need to."' : "Sign up today and start your journey!"}
            </p>
            <p className="font-bold">
              {isLogin ? "Mas Parjono" : "New User"}
            </p>
            <p className="text-sm">
              {isLogin ? "UI Designer at Google" : "Excited to get started"}
            </p>
          </div>
          <div className="absolute bottom-8 left-8">
            <button className="bg-gray-300 rounded-full p-2 hover:bg-gray-400 transition duration-300">
              <span className="sr-only">Previous</span>
              &lt;
            </button>
          </div>
          <div className="absolute bottom-8 right-8">
            <button className="bg-gray-300 rounded-full p-2 hover:bg-gray-400 transition duration-300">
              <span className="sr-only">Next</span>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
