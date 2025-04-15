// PageNotFound.jsx ================================
import React from "react";
import "../static/css/PageNotFound.css"

function PageNotFound() {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="w-100 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>

                <p>The page you are looking for not avaible!</p>

                <a href="/" className="px-3 py-2 d-inline-block mt-4 text-decoration-none bg-dark text-white rounded">
                  Back To Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
