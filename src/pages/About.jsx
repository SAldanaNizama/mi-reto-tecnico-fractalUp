import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton/BackButton';
function About() {
  return (
    
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="fixed top-4 left-4 z-20 lg:left-[280px]">
         <BackButton />
        </div>
  <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
    IM SAMIR
  </h1>
  <p className="text-lg leading-relaxed mb-6 text-gray-700">
    Hello! Im Samir, a passionate web developer with expertise in JavaScript and React. I specialize in end-to-end project development and am committed to continuous learning. My goal is to become a senior developer while sharing my passion for programming with others.
  </p>
  <p className="text-lg leading-relaxed mb-6 text-gray-700">
    Vivamus hendrerit arcu quis justo iaculis efficitur. Suspendisse potenti.
    Integer eleifend libero vel lacinia commodo. Fusce sit amet dictum ipsum.
    Donec id pretium mauris, a efficitur libero.
  </p>
  <p className="text-lg leading-relaxed mb-6 text-gray-700">
    Nam consectetur, felis sit amet lobortis bibendum, lorem justo volutpat magna,
    a feugiat metus elit non leo. Quisque dignissim purus a arcu fermentum, vitae
    posuere purus sagittis. Suspendisse mollis est et libero consectetur sodales.
  </p>
  <Link 
    to="/" 
    className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition ease-in-out duration-300"
  >
    Back to Home
  </Link>
</div>
  );
}

export default About;
