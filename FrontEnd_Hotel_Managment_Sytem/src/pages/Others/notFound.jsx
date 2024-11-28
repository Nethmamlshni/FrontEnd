function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-[#4A4947] text-white">
              <div className="text-center space-y-6">
                <h1 className="text-9xl font-extrabold tracking-wider">404</h1>
                <p className="text-xl font-light tracking-wide">
                  Oops! The page you're looking for doesn't exist.
                </p>
                <a href="/" className="mt-6 inline-block px-6 py-3 bg-[#B17457] text-white rounded-lg hover:bg-[#A35D3B] transition-all">
                  Go Back Home
                </a>
              </div>
            </div>
    );
}

export default NotFound;