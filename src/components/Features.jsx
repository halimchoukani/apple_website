import { useGSAP } from "@gsap/react";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { animationGSAP } from "../utils/animation";
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

//
gsap.registerPlugin(ScrollTrigger);
function Features() {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleLoadedMetadata = () => {
      video.currentTime = video.duration;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const scrollTrigger = ScrollTrigger.create({
      trigger: videoRef.current,
      scrub: 1,
      start: "-100% bottom",
      end: "bottom",
      onUpdate: (self) => {
        video.currentTime = video.duration * self.progress * 0.3;
        video.pause();
      },
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      scrollTrigger.kill();
    };
  }, [videoRef, window.innerHeight]);
  useGSAP(() => {
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    animationGSAP("#features_title", { y: 0, opacity: 1 });
    animationGSAP(
      ".g_grow",
      { scale: 1, opacity: 1, ease: "power1" },
      { scrub: 5.5 }
    );
    animationGSAP(".g_text", {
      y: 0,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    });
  }, []);

  return (
    <section
      className="h-full common-padding bg-zinc relative overflow-hidden wrapper"
      id="wrapper"
    >
      <div className="screen-max-width content" id="content">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">
            Explore the whole story
          </h1>
          <div className="flex flex-col justify-center items-center overflow-hidden">
            <div className="mt-32 mb-24 pl-24">
              <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
              <h2 className="text-5xl lg:text-7xl font-semibold">
                Forged in Titanium.
              </h2>
            </div>
            <div className="flex-center flex-col sm:px-10">
              <div className="relative h-[50vh] w-full flex items-center">
                <video
                  playsInline
                  id="exploreVideo"
                  className="w-full h-full object-cover object-center"
                  preload="none"
                  muted
                  ref={videoRef}
                >
                  <source src={exploreVideo} type="video/mp4" />
                </video>
              </div>
              <div className="flex flex-col w-full relative">
                <div className="feature-video-container">
                  <div className="overflow-hidden flex-1 h-[50vh] ">
                    <img
                      src={explore1Img}
                      alt="titanium"
                      className="feature-video g_grow"
                    />
                  </div>
                  <div className="overflow-hidden flex-1 h-[50vh] ">
                    <img
                      src={explore2Img}
                      alt="titanium"
                      className="feature-video g_grow"
                    />
                  </div>
                </div>
                <div className="feature-text-container">
                  <div className="flex-1 flex-center">
                    <p className="feature-text g_text">
                      iPhone 15 Pro is{" "}
                      <span className="text-white">
                        The first iPhone to feature the aerospace-grade titanium
                      </span>
                      ,using the same alloy that spacecrafts used for there
                      messions to Mars.
                    </p>
                  </div>
                  <div className="flex-1 flex-center">
                    <p className="feature-text g_text">
                      Titanium has one of the best strength-to-weight ratios of
                      any matal ,making these are{" "}
                      <span className="text-white">
                        Lightest Pro model ever
                      </span>
                      , You'll notice the diffrence the moment you pick one up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
