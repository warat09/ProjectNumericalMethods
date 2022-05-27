import React from "react";

const Home :React.FC = () =>{
  document.title = "Numer Machine"
    return(
      <div>
      <header className="bg-white shadow">
  <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold text-gray-900">Home</h1>
  </div>
</header>
<main>
  <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    {/* <!-- Replace with your content --> */}
    <div className="px-4 py-6 sm:px-0">
      <h1>6204062616111 นาย วรัศฐ์ เย็นใจประเสริฐ</h1>
      <h2>กด Link Procject ข้างบน</h2>
    </div>
    {/* <!-- /End replace --> */}
  </div>
</main>
  </div>
    );

};
export default Home