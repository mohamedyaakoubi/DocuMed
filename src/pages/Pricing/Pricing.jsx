import React from 'react';
import './Pricing.css';

export const Pricing = () => {

    return  (
    
        <div className="container1">
            <div className="text-center">
                <div className="nav1 price-tabs" role="tablist">
                    <a className="nav-link1 active" href="#yearly" role="tab" data-toggle="tab">Yearly</a>
                    <a className="nav-link1" href="#monthly" role="tab" data-toggle="tab">Monthly</a>

  return (
    <div className="container">
      <div className="text-center mb-4">
        <ul className="nav nav-tabs justify-content-center" id="pricing-tabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="yearly-tab" data-bs-toggle="tab" data-bs-target="#yearly" type="button" role="tab" aria-controls="yearly" aria-selected="true">Yearly</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="monthly-tab" data-bs-toggle="tab" data-bs-target="#monthly" type="button" role="tab" aria-controls="monthly" aria-selected="false">Monthly</button>
          </li>
        </ul>
      </div>
      <div className="tab-content">
        {/* Yearly Tab Content */}
        <div className="tab-pane fade show active" id="yearly" role="tabpanel" aria-labelledby="yearly-tab">
          <div className="row justify-content-center">
            {/* Session Plan */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="price-item text-center">
                <div className="price-top">
                  <h4>Session</h4>
                  <h2 className="mb-0"><sup>$</sup>99</h2>
                  <span className="text-capitalize">per year</span>

                </div>
                <div className="price-content">
                  <ul className="list-unstyled border-bottom mb-3 mt-md-4 pb-3 text-left">
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Eget erovtiu faucid</span></li>
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Cras justo odio</span></li>
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Morbi leo risus</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Porta consectetur ac</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Vestibulum at eros</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Adipisci atque beatae</span></li>
                  </ul>
                  <a href="#" className="btn btn-custom">Buy now</a>
                </div>
              </div>
            </div>
            {/* Monthly Plan */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="price-item text-center popular">
                <div className="price-top">
                  <h4>Monthly</h4>
                  <h2 className="mb-0"><sup>$</sup>299</h2>
                  <span className="text-capitalize">per year</span>
                </div>
                <div className="price-content">
                  <ul className="list-unstyled border-bottom mb-3 mt-md-4 pb-3 text-left">
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Eget erovtiu faucid</span></li>
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Cras justo odio</span></li>
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Morbi leo risus</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Porta consectetur ac</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Vestibulum at eros</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Adipisci atque beatae</span></li>
                  </ul>
                  <a href="#" className="btn btn-custom btn-light">Buy now</a>
                </div>
              </div>
            </div>
            {/* Yearly Plan */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="price-item text-center">
                <div className="price-top">
                  <h4>Yearly</h4>
                  <h2 className="mb-0"><sup>$</sup>399</h2>
                  <span className="text-capitalize">per year</span>
                </div>
                <div className="price-content">
                  <ul className="list-unstyled border-bottom mb-3 mt-md-4 pb-3 text-left">
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Eget erovtiu faucid</span></li>
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Cras justo odio</span></li>
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Morbi leo risus</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Porta consectetur ac</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Vestibulum at eros</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Adipisci atque beatae</span></li>
                  </ul>
                  <a href="#" className="btn btn-custom">Buy now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Monthly Tab Content */}
        <div className="tab-pane fade" id="monthly" role="tabpanel" aria-labelledby="monthly-tab">
          <div className="row justify-content-center">
            {/* Session Plan */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="price-item text-center">
                <div className="price-top">
                  <h4>Session</h4>
                  <h2 className="mb-0"><sup>$</sup>29</h2>
                  <span className="text-capitalize">per month</span>
                </div>
                <div className="price-content">
                  <ul className="list-unstyled border-bottom mb-3 mt-md-4 pb-3 text-left">
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Eget erovtiu faucid</span></li>
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Cras justo odio</span></li>
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Morbi leo risus</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Porta consectetur ac</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Vestibulum at eros</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Adipisci atque beatae</span></li>
                  </ul>
                  <a href="#" className="btn btn-custom">Buy now</a>
                </div>
              </div>
            </div>
            {/* Monthly Plan */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="price-item text-center popular">
                <div className="price-top">
                  <h4>Monthly</h4>
                  <h2 className="mb-0"><sup>$</sup>59</h2>
                  <span className="text-capitalize">per month</span>
                </div>
                <div className="price-content">
                  <ul className="list-unstyled border-bottom mb-3 mt-md-4 pb-3 text-left">
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Eget erovtiu faucid</span></li>
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Cras justo odio</span></li>
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Morbi leo risus</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Porta consectetur ac</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Vestibulum at eros</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Adipisci atque beatae</span></li>
                  </ul>
                  <a href="#" className="btn btn-custom btn-light">Buy now</a>
                </div>
              </div>
            </div>

            <div className="tab-content wow fadeIn" >
                <div role="tabpanel" className="tab-pane fade show active" id="yearly">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4 mb-30">
                            <div className="price-item text-center">
                                <div className="price-top">
                                    <h4>Session</h4>
                                    <h2 className="mb-0"><sup>$</sup>99</h2>
                                    <span className="text-capitalize">per year</span>
                                </div>
                                <div className="price-content">
                                    <ul className="border-bottom mb-30 mt-md-4 pb-3 text-left">
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Eget erovtiu faucid</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Cras justo odio</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Morbi leo risus</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span>Porta consectetur ac</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span> Vestibulum at eros</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span>Adipisci atque beatae</span>
                                        </li>
                                    </ul>
                                    <a href="#" className="btn btn-custom btn1">Buy now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-30">
                            <div className="price-item text-center popular">
                                <div className="price-top">
                                    <h4>Monthly</h4>
                                    <h2 className="mb-0"><sup>$</sup>299</h2>
                                    <span className="text-capitalize">per year</span>
                                </div>
                                <div className="price-content">
                                    <ul className="border-bottom mb-30 mt-md-4 pb-3 text-left">
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Eget erovtiu faucid</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Cras justo odio</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Morbi leo risus</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span>Porta consectetur ac</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span> Vestibulum at eros</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span>Adipisci atque beatae</span>
                                        </li>
                                    </ul>
                                    <a href="#" className="btn btn-custom btn-light">Buy now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-30">
                            <div className="price-item text-center">
                                <div className="price-top">
                                    <h4>Yearly</h4>
                                    <h2 className="mb-0"><sup>$</sup>399</h2>
                                    <span className="text-capitalize">per year</span>
                                </div>
                                <div className="price-content">
                                    <ul className="border-bottom mb-30 mt-md-4 pb-3 text-left">
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Eget erovtiu faucid</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Cras justo odio</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Morbi leo risus</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span>Porta consectetur ac</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span> Vestibulum at eros</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span>Adipisci atque beatae</span>
                                        </li>
                                    </ul>
                                    <a href="#" className="btn btn-custom btn2">Buy now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="monthly">
                    <div className="row justify-content-center ">
                        <div className="col-md-6 col-lg-4 mb-30 ">
                            <div className="price-item text-center ">
                                <div className="price-top">
                                    <h4>Session</h4>
                                    <h2 className="mb-0"><sup>$</sup>29</h2>
                                    <span className="text-capitalize">per month</span>
                                </div>
                                <div className="price-content">
                                    <ul className="border-bottom mb-30 mt-md-4 pb-3 text-left">
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Eget erovtiu faucid</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Cras justo odio</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Morbi leo risus</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span>Porta consectetur ac</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span> Vestibulum at eros</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span>Adipisci atque beatae</span>
                                        </li>
                                    </ul>
                                    <a href="#" className="btn btn-custom">Buy now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-30 ">
                            <div className="price-item text-center popular ">
                                <div className="price-top">
                                    <h4>Monthly</h4>
                                    <h2 className="mb-0"><sup>$</sup>59</h2>
                                    <span className="text-capitalize">per month</span>
                                </div>
                                <div className="price-content">
                                    <ul className="border-bottom mb-30 mt-md-4 pb-3 text-left">
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Eget erovtiu faucid</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Cras justo odio</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Morbi leo risus</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span>Porta consectetur ac</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span> Vestibulum at eros</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span>Adipisci atque beatae</span>
                                        </li>
                                    </ul>
                                    <a href="#" className="btn btn-custom btn-light">Buy now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-30 ">
                            <div className="price-item text-center ">
                                <div className="price-top">
                                    <h4>Enterprise</h4>
                                    <h2 className="mb-0"><sup>$</sup>99</h2>
                                    <span className="text-capitalize">per month</span>
                                </div>
                                <div className="price-content">
                                    <ul className="border-bottom mb-30 mt-md-4 pb-3 text-left">
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Eget erovtiu faucid</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Cras justo odio</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-check mr-2"></i>
                                            <span className="c-black">Morbi leo risus</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span>Porta consectetur ac</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span> Vestibulum at eros</span>
                                        </li>
                                        <li>
                                            <i className="zmdi zmdi-close mr-2"></i>
                                            <span>Adipisci atque beatae</span>
                                        </li>
                                    </ul>
                                    <a href="#" className="btn btn-custom">Buy now</a>
                                </div>
                            </div>
                        </div>
                    </div>

            {/* Yearly Plan */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="price-item text-center">
                <div className="price-top">
                  <h4>Yearly</h4>
                  <h2 className="mb-0"><sup>$</sup>99</h2>
                  <span className="text-capitalize">per month</span>
                </div>
                <div className="price-content">
                  <ul className="list-unstyled border-bottom mb-3 mt-md-4 pb-3 text-left">
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Eget erovtiu faucid</span></li>
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Cras justo odio</span></li>
                    <li><i className="zmdi zmdi-check mr-2"></i> <span className="c-black">Morbi leo risus</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Porta consectetur ac</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Vestibulum at eros</span></li>
                    <li><i className="zmdi zmdi-close mr-2"></i> <span>Adipisci atque beatae</span></li>
                  </ul>
                  <a href="#" className="btn btn-custom">Buy now</a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
