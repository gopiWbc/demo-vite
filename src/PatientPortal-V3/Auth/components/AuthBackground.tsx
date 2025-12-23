import styles from'./auth.module.css';
export default function AuthBackground() {
  return (
    <>
      {/* Additional subtle radial gradients for depth */}
      <div className={`absolute inset-0 ${styles.gradientLandingBackground}`}></div>

      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-purple-400 to-indigo-600 rounded-full opacity-20 blur-3xl"></div>
      </div> */}

      {/* Top Right Circles */}
      {/* <div className={styles.circleContainerTopRight}>
        <div className={`${styles.circle} ${styles.circle1}`} />
        <div className={`${styles.circle} ${styles.circle2}`} />
        <div className={`${styles.circle} ${styles.circle3}`} />
      </div> */}

      {/* Bottom Left Circles */}
      {/* <div className={styles.circleContainerBottomLeft}>
        <div className={`${styles.circle} ${styles.circle1}`} />
        <div className={`${styles.circle} ${styles.circle2}`} />
        <div className={`${styles.circle} ${styles.circle3}`} />
      </div> */}
    </>
  );
}