import { useRef, useState, useEffect, createRef } from "react";
import gsap from "gsap";
import "./Menu.scss";

const Menu = ({ items }) => {
  const $root = useRef();
  const $indicator1 = useRef();
  const $indicator2 = useRef();
  const $items = useRef(items.map(createRef));
  const [active, setActive] = useState(0);

  const animate = () => {
    const menuOffset = $root.current.getBoundingClientRect();
    const activeItem = $items.current[active].current;
    const { width, height, top, left } = activeItem.getBoundingClientRect();

    const settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width: width,
      height: height,
      backgroundColor: items[active].color,
      ease: "elastic.out(.7, .7)",
      duration: 0.8,
    };

    gsap.to($indicator1.current, {
      ...settings,
    });

    gsap.to($indicator2.current, {
      ...settings,
      duration: 1,
    });
  };

  useEffect(() => {
    animate();
    window.addEventListener("resize", animate);

    return () => {
      window.removeEventListener("resize", animate);
    };
  }, [active]);

  return (
    <div ref={$root} className="menu">
      {items.map((item, index) => (
        <a
          key={item.name}
          ref={$items.current[index]}
          className={`item ${active === index ? "active" : ""}`}
          onMouseEnter={() => {
            setActive(index);
          }}
          href={item.href}
        >
          {item.name}
        </a>
      ))}
      <div ref={$indicator1} className="indicator" />
      <div ref={$indicator2} className="indicator" />
    </div>
  );
};

export default Menu;
