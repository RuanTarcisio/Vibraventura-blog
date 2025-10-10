function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);
  
    useEffect(() => {
      const updateScrollProgress = () => {
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / (docHeight - windowHeight)) * 100;
        setScrollProgress(progress);
      };
  
      window.addEventListener('scroll', updateScrollProgress);
      return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);
  
    return (
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-600 md:hidden">
        <div 
          className="h-full bg-accent" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    );
  }