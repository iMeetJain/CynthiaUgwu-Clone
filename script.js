var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function FirstPageAnim() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: 0,
            duration: 2,
            delay: -1,
            ease: Expo.easeInOut,
            stagger: .2
        })
        .from("#herofooter", {
            y: '-10',
            opacity: 0,
            delay: -1,
            duration: 1.5,
            ease: Expo.easeInOut
        })
}
function CircleChaptaKaro() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;


    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        CircleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate (${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}
function CircleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
CircleChaptaKaro();
CircleMouseFollower();
FirstPageAnim();


document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });
    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});