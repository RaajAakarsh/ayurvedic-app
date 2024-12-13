import React from 'react'; 
import './PlansSection.css';

const PlansSection = () => {
  return (
    <section className="NewUserHomePage_subscriptionPlans__AG3Jc">
      <div className="OfferedSubscriptionPlans_plansWrapper__wNb8Y">
        <div className="Image_wrapper__bkC8Y OfferedSubscriptionPlans_plansSuccessRate__sAXuG">
          <img
            alt="plans-success-rate-info"
            loading="lazy"
            decoding="async"
            style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
            src="https://res.cloudinary.com/dmezmffej/image/upload/v1698999924/static/plans/subscription-cards-header-image-desktop.avif"
          />
        </div>
        <div className="SubscriptionPlan_plansWrapper__Cw7VJ OfferedSubscriptionPlans_plansListWrapper__4Mf4v">
          {/* Lite Plans */}
          <div className="SubscriptionPlan_litePlans__Six7g OfferedSubscriptionPlans_litePlansWrapper__J6sPE">
            <div className="SubscriptionTierPlans_slickContainer__6gfIC">
              <div className="SubscriptionTierPlans_tierInfo__nRk_p">
                <div className="SubscriptionTierPlans_tierHeader__6qFHu SubscriptionTierPlans_lite__ggimG">
                  <div className="Image_wrapper__bkC8Y SubscriptionTierPlans_icon__vDTN9">
                    <img
                      alt="lite-plan-icon"
                      loading="lazy"
                      decoding="async"
                      style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
                      src="images/liteIcon.37650250.svg"
                    />
                  </div>
                  <span className="title3-bold-m title1-bold-d SubscriptionTierPlans_planName__4b_XB">Lite plans</span>
                  <span className="SubscriptionTierPlans_separator__9tYi4"></span>
                </div>
                <span className="SubscriptionTierPlans_description__df22Z title2-regular-d">
                  Personalised. Self-guided. Flexible. Designed by fitness & nutrition experts.
                </span>
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium Button_btn__pmMpi Button_primary-gradient__m0ku_ SubscriptionTierPlans_viewMorePlans__2kas7 css-1vhgsp7"
                  type="button"
                  data-variant="contained"
                >
                  <span className="body1-semibold-m body2-semibold-d">View lite plan benefits</span>
                  <i className="icon-arrow-right SubscriptionTierPlans_arrow__TPqoX"></i>
                </button>
              </div>
              <div className="SubscriptionTierPlans_childrenWrapper__aPRis">
                {/* Lite Plan Filters */}
                <div className="hideScrollBarWidth OfferedSubscriptionPlans_filters__UYWX6">
                  <div className="OfferedSubscriptionPlans_pill__I8zr7 OfferedSubscriptionPlans_active__HTnLZ" data-value="">
                    <span className="OfferedSubscriptionPlans_pillTitle__zj_V6 OfferedSubscriptionPlans_active__HTnLZ body3-semibold-m label2-semibold-d">All</span>
                  </div>
                  <div className="OfferedSubscriptionPlans_pill__I8zr7" data-value="WEIGHT_LOSS">
                    <span className="OfferedSubscriptionPlans_pillTitle__zj_V6 body3-semibold-m label2-semibold-d">Weight Loss</span>
                  </div>
                  <div className="OfferedSubscriptionPlans_pill__I8zr7" data-value="STAY_FIT">
                    <span className="OfferedSubscriptionPlans_pillTitle__zj_V6 body3-semibold-m label2-semibold-d">Stay Fit</span>
                  </div>
                  <div className="OfferedSubscriptionPlans_pill__I8zr7" data-value="HEALTHY_SKIN">
                    <span className="OfferedSubscriptionPlans_pillTitle__zj_V6 body3-semibold-m label2-semibold-d">Healthy Skin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Plans */}
          <div className="SubscriptionPlan_proPlans__o8nYi OfferedSubscriptionPlans_proPlansWrapper__GwAod">
            <div className="SubscriptionTierPlans_slickContainer__6gfIC">
              <div className="SubscriptionTierPlans_tierInfo__nRk_p">
                <div className="SubscriptionTierPlans_tierHeader__6qFHu SubscriptionTierPlans_pro__USTbU">
                  <div className="Image_wrapper__bkC8Y SubscriptionTierPlans_icon__vDTN9">
                    <img
                      alt="pro-plan-icon"
                      loading="lazy"
                      decoding="async"
                      style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
                      src="images/ProIcon.6b2a5953.svg"
                    />
                  </div>
                  <span className="title3-bold-m title1-bold-d SubscriptionTierPlans_planName__4b_XB">Pro plans</span>
                  <span className="SubscriptionTierPlans_separator__9tYi4"></span>
                </div>
                <span className="SubscriptionTierPlans_description__df22Z title2-regular-d">
                  Dedicated crew of coaches. Personalised plans. Gabit clan membership.
                </span>
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium Button_btn__pmMpi Button_primary-gradient__m0ku_ SubscriptionTierPlans_viewMorePlans__2kas7 css-1vhgsp7"
                  type="button"
                  data-variant="contained"
                >
                  <span className="body1-semibold-m body2-semibold-d">View pro plan benefits</span>
                  <i className="icon-arrow-right SubscriptionTierPlans_arrow__TPqoX"></i>
                </button>
              </div>
              <div className="SubscriptionTierPlans_childrenWrapper__aPRis">
                {/* Pro Plan Filters */}
                <div className="hideScrollBarWidth OfferedSubscriptionPlans_filters__UYWX6">
                  <div className="OfferedSubscriptionPlans_pill__I8zr7 OfferedSubscriptionPlans_active__HTnLZ" data-value="">
                    <span className="OfferedSubscriptionPlans_pillTitle__zj_V6 OfferedSubscriptionPlans_active__HTnLZ body3-semibold-m label2-semibold-d">All</span>
                  </div>
                  <div className="OfferedSubscriptionPlans_pill__I8zr7" data-value="WEIGHT_LOSS">
                    <span className="OfferedSubscriptionPlans_pillTitle__zj_V6 body3-semibold-m label2-semibold-d">Weight Loss</span>
                  </div>
                  <div className="OfferedSubscriptionPlans_pill__I8zr7" data-value="DIABETES_REVERSAL">
                    <span className="OfferedSubscriptionPlans_pillTitle__zj_V6 body3-semibold-m label2-semibold-d">Chronic issue reversal</span>
                  </div>
                  <div className="OfferedSubscriptionPlans_pill__I8zr7" data-value="STAY_FIT">
                    <span className="OfferedSubscriptionPlans_pillTitle__zj_V6 body3-semibold-m label2-semibold-d">Stay Fit</span>
                  </div>
                  <div className="OfferedSubscriptionPlans_pill__I8zr7" data-value="HEALTHY_SKIN">
                    <span className="OfferedSubscriptionPlans_pillTitle__zj_V6 body3-semibold-m label2-semibold-d">Healthy Skin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
