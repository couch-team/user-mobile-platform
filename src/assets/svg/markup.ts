
export const getMarkup: any = (color?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tabFillColor = color || '979797';
  return {
    happy: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7001_25831)">
<path d="M27.9999 54.784C42.7915 54.784 54.7825 42.793 54.7825 28.0014C54.7825 13.2097 42.7915 1.21875 27.9999 1.21875C13.2083 1.21875 1.21729 13.2097 1.21729 28.0014C1.21729 42.793 13.2083 54.784 27.9999 54.784Z" fill="#D8F4CC"/>
<path d="M38.0484 34.4918C35.5113 37.3296 31.8494 38.956 28 38.956C24.1616 38.956 20.4972 37.3283 17.9492 34.4906C17.5 33.9903 16.7306 33.9477 16.2303 34.3981C15.7299 34.8473 15.6885 35.6167 16.1378 36.117C19.1472 39.4685 23.4713 41.3908 28 41.3908C32.5409 41.3908 36.8651 39.4673 39.8647 36.1158C40.3127 35.6143 40.2701 34.8461 39.7686 34.3969C39.2658 33.9476 38.4964 33.9903 38.0484 34.4918Z" fill="#00C288"/>
<path d="M37.7393 19.4805C34.383 19.4805 31.6523 22.2111 31.6523 25.5674C31.6523 26.2394 32.1977 26.7848 32.8697 26.7848C33.5417 26.7848 34.0871 26.2394 34.0871 25.5674C34.0871 23.5539 35.7257 21.9153 37.7393 21.9153C39.7529 21.9153 41.3915 23.5539 41.3915 25.5674C41.3915 26.2394 41.9369 26.7848 42.6089 26.7848C43.2809 26.7848 43.8263 26.2394 43.8263 25.5674C43.8263 22.2111 41.0956 19.4805 37.7393 19.4805Z" fill="#00C288"/>
<path d="M21.913 25.5674C21.913 26.2394 22.4583 26.7848 23.1303 26.7848C23.8023 26.7848 24.3477 26.2394 24.3477 25.5674C24.3477 22.2111 21.6171 19.4805 18.2608 19.4805C14.9044 19.4805 12.1738 22.2111 12.1738 25.5674C12.1738 26.2394 12.7192 26.7848 13.3912 26.7848C14.0632 26.7848 14.6086 26.2394 14.6086 25.5674C14.6086 23.5539 16.2472 21.9153 18.2608 21.9153C20.2743 21.9153 21.913 23.5539 21.913 25.5674Z" fill="#00C288"/>
</g>
<defs>
<clipPath id="clip0_7001_25831">
<rect width="56" height="56" fill="white"/>
</clipPath>
</defs>
</svg>
`,
    tired: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7001_25932)">
<path d="M27.9999 54.784C42.7915 54.784 54.7825 42.793 54.7825 28.0014C54.7825 13.2097 42.7915 1.21875 27.9999 1.21875C13.2083 1.21875 1.21729 13.2097 1.21729 28.0014C1.21729 42.793 13.2083 54.784 27.9999 54.784Z" fill="#FFF0B1"/>
<path d="M17.9526 40.9847C20.4896 38.147 24.1516 36.5206 28.0009 36.5206C31.8394 36.5206 35.5037 38.1482 38.0517 40.986C38.5009 41.4863 39.2703 41.5289 39.7707 41.0785C40.271 40.6293 40.3124 39.8599 39.8632 39.3595C36.8538 36.008 32.5296 34.0858 28.0009 34.0858C23.4601 34.0858 19.1359 36.0093 16.1363 39.3607C15.6883 39.8623 15.7309 40.6305 16.2324 41.0797C16.7352 41.5289 17.5046 41.4863 17.9526 40.9847Z" fill="#FFB800"/>
<path d="M37.7393 19.4805C34.383 19.4805 31.6523 22.2111 31.6523 25.5674C31.6523 26.2394 32.1977 26.7848 32.8697 26.7848C33.5417 26.7848 34.0871 26.2394 34.0871 25.5674C34.0871 23.5539 35.7257 21.9153 37.7393 21.9153C39.7529 21.9153 41.3915 23.5539 41.3915 25.5674C41.3915 26.2394 41.9369 26.7848 42.6089 26.7848C43.2809 26.7848 43.8263 26.2394 43.8263 25.5674C43.8263 22.2111 41.0956 19.4805 37.7393 19.4805Z" fill="#FFB800"/>
<path d="M21.913 25.5674C21.913 26.2394 22.4583 26.7848 23.1303 26.7848C23.8023 26.7848 24.3477 26.2394 24.3477 25.5674C24.3477 22.2111 21.6171 19.4805 18.2608 19.4805C14.9044 19.4805 12.1738 22.2111 12.1738 25.5674C12.1738 26.2394 12.7192 26.7848 13.3912 26.7848C14.0632 26.7848 14.6086 26.2394 14.6086 25.5674C14.6086 23.5539 16.2472 21.9153 18.2608 21.9153C20.2743 21.9153 21.913 23.5539 21.913 25.5674Z" fill="#FFB800"/>
</g>
<defs>
<clipPath id="clip0_7001_25932">
<rect width="56" height="56" fill="white"/>
</clipPath>
</defs>
</svg>
`,
    'self-care': `<svg width="148" height="114" viewBox="0 0 148 114" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M147.627 40.8438C147.007 20.6264 138.618 10.6795 131.686 5.89419C118.311 -3.33732 102.515 0.803601 99.484 1.72552C86.46 5.70918 79.393 16.3806 76.9263 20.8545C74.2006 16.4269 66.4615 5.71535 53.4128 1.72552C50.3819 0.800517 34.5767 -3.3404 21.2136 5.89419C14.2761 10.6795 5.88323 20.6264 5.2604 40.8438C5.2604 40.9116 5.25731 40.9702 5.25731 41.0319C1.93656 43.2858 -0.0244367 47.8152 0.000229964 51.1544C0.0618966 58.6223 5.33131 64.4775 5.51323 64.6749C5.64273 64.8321 8.7569 68.5814 15.7499 72.2198C22.5394 81.997 32.6651 91.5492 45.0909 99.9143C44.8011 100.445 44.6346 101.021 44.6346 101.641C44.6346 103.738 46.0899 105.338 48.9451 106.408C48.9204 106.58 48.8741 106.75 48.8741 106.926C48.8741 108.119 49.3613 109.174 50.3264 110.055C53.3573 112.84 61.0317 113.422 66.9517 113.422C70.5469 113.422 73.5007 113.207 74.3671 113.136C75.471 113.197 85.6152 113.623 90.6502 111.175C90.9863 111.181 91.3193 111.187 91.6523 111.187C103.699 111.187 114.33 106.833 122.458 98.5545C130.552 90.3251 133.768 78.5283 134.242 76.6289C143.366 64.9647 147.994 52.5974 147.627 40.8438ZM17.0942 70.2834C10.3787 66.8455 7.36015 63.2319 7.28923 63.1486C7.2399 63.0931 2.39906 57.6911 2.34356 51.1359C2.32506 48.5336 3.86056 44.8552 6.41048 43.036C9.64798 44.9693 24.4048 52.3169 56.8384 48.808C56.1508 53.3344 54.4611 66.7284 56.7521 76.1017C37.3486 78.1213 24.5035 74.0821 17.0942 70.2834ZM89.42 109.164C84.6901 111.329 74.5182 110.802 74.4165 110.798C74.3641 110.795 74.3086 110.795 74.2531 110.802C69.2426 111.215 55.454 111.585 51.9143 108.335C51.4919 107.946 51.2791 107.546 51.2391 107.086C54.7016 107.897 59.0584 108.119 62.7461 108.119C63.4891 108.119 64.2076 108.11 64.8859 108.097C65.5334 108.082 66.0452 107.546 66.0329 106.901C66.0175 106.257 65.5056 105.785 64.8366 105.757C60.5939 105.856 54.7047 105.714 50.7303 104.542C48.2421 103.815 46.9779 102.84 46.9779 101.644C46.9779 101.379 47.0396 100.981 47.5946 100.506C47.6285 100.475 47.6716 100.454 47.7056 100.423C51.4056 101.872 57.1498 102.227 61.7779 102.227C65.7369 102.227 68.8603 101.977 69.1409 101.955C69.7853 101.903 70.2632 101.336 70.2108 100.691C70.1553 100.05 69.6096 99.5813 68.9466 99.6244C68.7986 99.6368 54.0572 100.818 48.017 98.0427C45.9111 97.0776 45.9111 96.0786 45.9111 95.7518C45.9111 94.5215 47.7611 93.763 49.0406 93.3807C52.7468 94.3026 57.5106 94.5493 61.4911 94.5493C65.6783 94.5493 68.9898 94.281 69.2581 94.2594C69.9025 94.207 70.3804 93.6428 70.328 92.9984C70.2725 92.3539 69.7236 91.8637 69.0638 91.9315C68.9405 91.9377 56.4838 92.9429 49.3089 91.0435C47.2801 90.5009 44.8596 89.5019 44.8596 87.8122C44.8596 87.5285 44.9213 87.0938 45.4763 86.5974C49.4137 83.0639 66.8901 84.0598 73.2911 84.7412C73.7505 84.7905 74.1821 84.5716 74.4165 84.1831C74.6539 83.7946 74.6416 83.3044 74.3887 82.9282C73.3527 81.3804 70.7319 80.4554 67.6979 79.3854C65.3268 78.5468 62.8694 77.6804 61.5035 76.5827C60.3565 75.6731 60.4891 75.0349 60.6987 74.5076C61.2907 73.0369 63.2116 73.2712 67.4574 74.1592C69.8871 74.6679 72.6436 75.2414 75.5357 75.2414C80.0621 75.2414 84.6439 78.3402 86.9687 80.1871C88.0109 81.0196 88.7663 81.7164 89.1301 82.0679C89.5618 84.55 92.0131 99.7324 89.42 109.164ZM88.0602 78.075C84.9276 75.6484 80.3211 72.9012 75.5357 72.9012C72.8841 72.9012 70.2571 72.3524 67.9384 71.8683C63.8807 71.0204 60.0543 70.2279 58.6051 73.4685C56.9309 63.7036 58.9474 50.4114 59.3328 48.0495C60.6741 46.7977 67.2786 40.9579 73.6857 40.9579C76.6827 40.9579 79.541 40.3597 82.0601 39.8324C86.497 38.9044 88.5042 38.6608 89.1332 40.224C89.3182 40.6896 89.3244 41.0596 89.1579 41.4296C88.4395 43.0114 84.795 44.3002 81.8627 45.3393C78.7085 46.4554 75.9828 47.4174 74.9098 49.0208C74.6601 49.4 74.6477 49.8872 74.8851 50.2757C75.1195 50.6642 75.5511 50.8862 76.0106 50.8307C82.6675 50.1246 100.834 49.0855 104.938 52.7639C105.524 53.2912 105.592 53.7537 105.592 54.0528C105.592 55.8442 103.07 56.8864 100.949 57.4475C100.942 57.4475 100.939 57.4475 100.933 57.4475C93.4622 59.4301 80.5184 58.3941 80.3889 58.3849C79.7506 58.3324 79.1802 58.8104 79.1247 59.4548C79.0723 60.0961 79.5502 60.6604 80.1977 60.7159C80.4721 60.7374 83.8823 61.0119 88.2082 61.0119C92.3584 61.0119 97.338 60.7529 101.201 59.7878C102.543 60.1886 104.491 60.9964 104.491 62.3069C104.491 62.6522 104.491 63.7067 102.281 64.7273C96.0029 67.604 80.6726 66.383 80.5184 66.3676C79.8863 66.3214 79.3066 66.7931 79.2542 67.4375C79.2018 68.0789 79.6797 68.6431 80.3242 68.6986C80.6171 68.7233 83.8669 68.9823 87.9801 68.9823C92.7993 68.9823 98.781 68.6092 102.614 67.0984C103.283 67.6194 103.378 68.0912 103.378 68.4211C103.378 69.676 102.055 70.7028 99.447 71.4736C95.3338 72.6854 89.1795 72.8303 84.7333 72.7347C84.092 72.7594 83.5524 73.2342 83.537 73.8786C83.5246 74.523 84.0365 75.0595 84.684 75.0719C85.3777 75.0873 86.1116 75.0965 86.8731 75.0965C90.7551 75.0965 95.3461 74.8622 98.9598 74.0112C98.8457 76.1233 94.896 77.5909 88.0602 78.075ZM120.784 96.9173C111.33 106.547 100.131 108.791 91.9267 108.847C94.0388 99.8649 92.3399 87.2171 91.6338 82.8295C112.715 85.0464 124.268 80.9333 131.384 78.0935C130.117 82.1173 126.879 90.7198 120.784 96.9173Z" fill="#B67BEE"/>
</svg>
`,
    therapy: `<svg width="126" height="120" viewBox="0 0 126 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M39.5637 0.000976814C43.5326 0.121983 47.3756 0.816709 51.0989 2.08616H51.4706C51.7226 2.20616 51.9116 2.33879 52.0376 2.45879C53.4298 2.9072 54.7465 3.41246 56.0065 4.10718L58.4005 5.18085C59.3455 5.6861 60.4795 6.62714 61.1095 7.0124C61.7395 7.38502 62.4324 7.77028 62.9994 8.20606C69.9987 2.84404 78.4973 -0.0611716 87.2542 0.000976814C91.2294 0.000976814 95.1984 0.564081 98.9721 1.83353C122.225 9.41236 130.604 34.9909 123.605 57.3484C119.636 68.7735 113.147 79.2007 104.648 87.7205C92.4831 99.5309 79.1336 110.015 64.7634 119.046L63.1884 120L61.5505 118.983C47.1299 110.015 33.7048 99.5309 21.4262 87.6574C12.9843 79.1375 6.48904 68.7735 2.45708 57.3484C-4.66185 34.9909 3.71707 9.41236 27.2221 1.7009C29.0491 1.06934 30.9328 0.627238 32.8228 0.380926H33.5788C35.349 0.121983 37.1067 0.000976814 38.8707 0.000976814H39.5637Z" fill="#B0E899"/>
<path d="M82.4922 50.4951H69.4978V37.5043C69.4978 33.9037 66.5918 31 62.99 31C59.3882 31 56.4834 33.9037 56.4834 37.5043V50.4951H43.5066C39.9048 50.4951 37 53.3789 37 56.9806C37 60.5811 39.9048 63.4848 43.5066 63.4848H56.5022V76.4946C56.5022 80.0963 59.407 83 63.01 83C66.6118 83 69.5166 80.0963 69.5166 76.4946V63.4848H82.5122C86.1141 63.4848 89 60.5811 89 56.9806C89 53.3789 86.0952 50.4951 82.4922 50.4951Z" fill="#0A0B2B"/>
</svg>

`,
    mindspace: `<svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.3187 125.606H36.8812C40.3812 125.606 43.225 122.763 43.225 119.219V80.0187C43.225 76.5187 40.3812 73.6749 36.8812 73.6749H30.3187C25.5501 73.6749 21.0875 74.9876 17.2375 77.2624C18.6813 49.3937 41.7374 27.1251 70 27.1251C98.2626 27.1251 121.319 49.3937 122.762 77.2624C118.912 74.9876 114.45 73.6748 109.681 73.6748H103.119C99.6188 73.6748 96.775 76.5187 96.775 80.0186V119.219C96.775 122.763 99.6188 125.606 103.119 125.606H109.681C123.988 125.606 135.625 113.969 135.625 99.6186V80.0187C135.625 43.8373 106.181 14.3937 70 14.3937C33.8187 14.3937 4.375 43.8373 4.375 80.0187V99.6186C4.375 113.969 16.0124 125.606 30.3187 125.606Z" fill="#7ECDC8"/>
</svg>
`,
    'mood-tracker': `<svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7001_14845)">
<path d="M70 136.957C106.979 136.957 136.957 106.979 136.957 70C136.957 33.0209 106.979 3.04346 70 3.04346C33.0209 3.04346 3.04346 33.0209 3.04346 70C3.04346 106.979 33.0209 136.957 70 136.957Z" fill="#FFC634"/>
<path d="M95.1209 86.2309C88.7783 93.3253 79.6235 97.3913 70.0001 97.3913C60.404 97.3913 51.2431 93.3222 44.8731 86.2279C43.7501 84.977 41.8266 84.8705 40.5757 85.9966C39.3249 87.1196 39.2214 89.0431 40.3444 90.2939C47.8679 98.6726 58.6783 103.478 70.0001 103.478C81.3522 103.478 92.1627 98.6696 99.6618 90.2909C100.782 89.037 100.675 87.1166 99.4214 85.9935C98.1644 84.8705 96.2409 84.977 95.1209 86.2309Z" fill="#0F1141"/>
<path d="M94.3478 48.6957C85.9569 48.6957 79.1304 55.5222 79.1304 63.9131C79.1304 65.5931 80.4938 66.9565 82.1738 66.9565C83.8538 66.9565 85.2173 65.5931 85.2173 63.9131C85.2173 58.8792 89.3139 54.7826 94.3478 54.7826C99.3817 54.7826 103.478 58.8792 103.478 63.9131C103.478 65.5931 104.842 66.9565 106.522 66.9565C108.202 66.9565 109.565 65.5931 109.565 63.9131C109.565 55.5222 102.739 48.6957 94.3478 48.6957Z" fill="#0F1141"/>
<path d="M54.7824 63.9131C54.7824 65.5931 56.1459 66.9565 57.8259 66.9565C59.5059 66.9565 60.8694 65.5931 60.8694 63.9131C60.8694 55.5222 54.0428 48.6957 45.652 48.6957C37.2611 48.6957 30.4346 55.5222 30.4346 63.9131C30.4346 65.5931 31.798 66.9565 33.478 66.9565C35.158 66.9565 36.5215 65.5931 36.5215 63.9131C36.5215 58.8792 40.618 54.7826 45.652 54.7826C50.6859 54.7826 54.7824 58.8792 54.7824 63.9131Z" fill="#0F1141"/>
</g>
<defs>
<clipPath id="clip0_7001_14845">
<rect width="140" height="140" fill="white"/>
</clipPath>
</defs>
</svg>
`,
    journal: `<svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7066_2662)">
<path d="M30.3516 135.898H30.3708C30.3708 136.451 30.4829 137.011 30.7201 137.549C31.6312 139.61 34.0419 140.543 36.1034 139.632L45.1172 135.628L53.7486 139.462C54.3478 139.805 55.0421 140 55.7812 140C58.0467 140 59.8828 138.164 59.8828 135.898V127.695H30.3516V135.898Z" fill="#7378DE"/>
<path d="M111.8 4.41132C109.076 1.68869 105.316 0 101.172 0H94.3359V119.492H101.172C105.316 119.492 109.076 117.803 111.8 115.081C114.522 112.358 116.211 108.597 116.211 104.453V15.0391C116.211 10.8948 114.522 7.13501 111.8 4.41132Z" fill="#7378DE"/>
<path d="M23.7891 4.10156V115.391C23.7891 117.656 25.6252 119.492 27.8906 119.492H86.1328V0H27.8906C25.6252 0 23.7891 1.83609 23.7891 4.10156Z" fill="#7378DE"/>
</g>
<defs>
<clipPath id="clip0_7066_2662">
<rect width="140" height="140" rx="20" fill="white"/>
</clipPath>
</defs>
</svg>
`,
    'palm-tree': `<svg width="148" height="167" viewBox="0 0 148 167" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M83.2572 173.177L83.2572 173.177C78.2121 148.607 75.2843 110.18 85.7811 58.0442L85.8798 57.5537L85.3841 57.4862L77.1548 56.3648L76.7351 56.3076L76.5834 56.7077L77.056 56.8552C76.5834 56.7077 76.5833 56.708 76.5831 56.7086L76.5823 56.7108L76.579 56.7193L76.5665 56.7526L76.5177 56.8833C76.4747 56.9988 76.4113 57.1704 76.3289 57.3964C76.1641 57.8483 75.9235 58.5174 75.6195 59.388C75.0115 61.129 74.15 63.676 73.1343 66.9035C71.103 73.358 68.4547 82.5355 65.9854 93.4312C61.0483 115.216 56.8202 143.899 59.6872 171.429C59.7869 172.386 60.5394 173.117 61.5099 173.249L80.6015 175.851C82.1514 176.062 83.5682 174.693 83.2572 173.177Z" fill="#F5A871" stroke="black"/>
<path d="M74.5442 174.703L74.613 175.018L74.9402 175.063L80.6968 175.85C82.2444 176.062 83.654 174.691 83.3441 173.179C78.3202 148.622 75.4013 110.215 85.8574 58.1089L85.9558 57.6184L85.4602 57.5506L77.2638 56.43L76.8419 56.3723L76.6918 56.7752L77.1653 56.9205L76.6918 56.7752L76.6918 56.7752L76.6918 56.7753L76.6917 56.7754L76.6915 56.7761L76.6906 56.7784L76.6873 56.7874L76.6741 56.8229L76.6224 56.9631C76.5768 57.0872 76.5092 57.2721 76.4207 57.5163L76.4075 57.5528L76.4 57.5904C65.7509 111.177 69.2147 150.271 74.5442 174.703Z" fill="#E89A5E" stroke="black"/>
<path d="M79.514 43.1493L79.5141 43.1493C80.3155 43.0008 81.1121 43.5609 81.0683 44.4034L81.0683 44.4038C79.9466 65.6393 64.2531 78.7353 58.2957 82.9679C56.9167 83.9477 54.951 83.4619 54.3665 81.9744L53.6252 80.0884L53.6252 80.0883C53.586 79.9885 53.4905 79.9143 53.3595 79.8946C53.2284 79.875 53.1066 79.9169 53.0275 80.0002C44.4189 89.0745 36.2584 93.2719 31.7697 95.0626L31.6019 94.605L31.7696 95.0626C29.9177 95.8012 27.8538 94.3868 28.3194 92.4349L79.514 43.1493ZM79.514 43.1493C73.0334 44.3507 37.8059 52.6527 28.3195 92.4348L79.514 43.1493Z" fill="#2DB181" stroke="black"/>
<path d="M58.2943 82.9678L58.2941 82.9679C56.9151 83.9471 54.9512 83.4631 54.3647 81.9753L54.3644 81.9745L53.6257 80.0899C53.6257 80.0899 53.6257 80.0899 53.6257 80.0899C53.5866 79.9901 53.491 79.9157 53.3599 79.8959C53.2287 79.8761 53.1074 79.9179 53.0288 80.0008L53.0287 80.0009C44.4194 89.0736 36.2623 93.2698 31.7715 95.0622C29.9124 95.8043 27.8571 94.3704 28.3206 92.4213L28.3208 92.4204C28.7774 90.5152 29.292 88.6797 29.8609 86.9139L29.9325 86.6917L30.1488 86.5925C34.4244 84.6312 40.8007 80.9098 47.5947 74.1327C48.9729 72.7579 51.3789 73.144 52.0532 74.8673M58.2943 82.9678L79.5149 43.1498C78.788 43.2844 77.7078 43.5066 76.3482 43.849L76.0209 43.9315L75.9537 44.2556C72.4469 61.1678 59.7097 71.7508 54.4758 75.4682L54.4747 75.4691C54.113 75.7274 53.6744 75.8205 53.2561 75.7626C52.7138 75.6875 52.2483 75.363 52.0532 74.8673M58.2943 82.9678C64.2522 78.7339 79.9456 65.6386 81.0699 44.4045C81.1146 43.5604 80.3162 43.0012 79.5151 43.1498L58.2943 82.9678ZM52.0532 74.8673C52.0532 74.8675 52.0533 74.8676 52.0534 74.8678L51.5806 75.0671M52.0532 74.8673C52.0531 74.8672 52.0531 74.867 52.053 74.8669L51.5806 75.0671M51.5806 75.0671C51.0359 73.6739 49.0654 73.3525 47.9449 74.4701C41.1001 81.298 34.6685 85.0546 30.3416 87.0393L54.7569 75.8641C54.2728 76.2099 53.695 76.3275 53.1589 76.2533C52.466 76.1573 51.8447 75.7382 51.5806 75.0671Z" fill="#1CA56F" stroke="black"/>
<path d="M83.3728 44.0184L83.3729 44.0184C88.8048 46.7984 117.041 63.197 112.099 101.54C111.676 104.822 107.42 106.273 105.128 104.023C101.672 100.63 97.1102 94.9277 93.5258 86.1253L83.3728 44.0184ZM83.3728 44.0184C82.6692 43.6585 81.7046 43.9991 81.4184 44.8039C74.1075 65.3579 83.5665 81.9706 87.4507 87.575C88.3543 88.8791 90.3894 88.9275 91.5199 87.6607L92.9526 86.0552L92.9527 86.0551M83.3728 44.0184L92.9527 86.0551M92.9527 86.0551C93.1146 85.8736 93.4379 85.9096 93.5257 86.1253L92.9527 86.0551Z" fill="#A3E440" stroke="black"/>
<path d="M103.45 102.042L103.428 102.251L103.566 102.402C104.107 102.99 104.629 103.532 105.129 104.022C107.421 106.274 111.677 104.821 112.1 101.542L112.1 101.542C117.042 63.2081 88.8196 46.8073 83.3773 44.0211C82.6748 43.6614 81.7064 43.9968 81.4191 44.8055L81.4191 44.8056C80.8194 46.4943 80.3298 48.1573 79.9435 49.7895L79.8692 50.1034L80.1269 50.2799C89.5771 56.7493 106.519 72.6267 103.45 102.042Z" fill="#99D53B" stroke="black"/>
<path d="M82.5586 45.995L82.5587 45.9951C113.116 51.9371 125.02 76.6148 128.919 87.8535L129.4 87.666L128.919 87.8536C129.301 88.9561 130.347 89.4518 131.358 89.4018C132.371 89.3517 133.431 88.7491 133.823 87.5961C135.689 82.116 137.859 73.4758 136.845 64.9093C135.827 56.3173 131.603 47.8006 120.706 42.6537C100.969 33.3317 86.7277 40.6862 82.1734 43.6986L82.1733 43.6987C81.1337 44.3868 81.4722 45.7836 82.5586 45.995Z" fill="#1CA56F" stroke="black"/>
<path d="M125.859 80.1803L125.832 80.331L125.896 80.4643C127.234 83.2538 128.224 85.7838 128.943 87.8542C129.325 88.956 130.368 89.4527 131.378 89.4031C132.389 89.3535 133.448 88.7509 133.84 87.5986C135.703 82.1303 137.87 73.507 136.857 64.957C135.842 56.3813 131.624 47.8804 120.746 42.7435C106.356 35.9482 94.8798 38.0341 87.9638 40.8288L88.15 41.7748C94.2781 41.101 101.944 41.8556 110.763 46.0201L110.763 46.0201C118.788 49.8082 123.052 55.4562 125.071 61.587C127.095 67.7325 126.87 74.3887 125.859 80.1803Z" fill="#158F5E" stroke="black"/>
<path d="M43.963 25.0233L43.963 25.0233C57.6368 25.0726 66.3475 28.3068 71.8729 32.1722C77.3971 36.0367 79.7017 40.5071 80.6098 42.9703L43.963 25.0233ZM43.963 25.0233C42.7537 25.0189 41.7684 25.6735 41.284 26.5658C40.7977 27.4615 40.827 28.5813 41.5961 29.4472L41.596 29.4473M43.963 25.0233L41.596 29.4473M41.596 29.4473L41.6006 29.4522M41.596 29.4473L41.6006 29.4522M41.6006 29.4522C41.6735 29.5364 41.6802 29.6266 41.6545 29.7011C41.6282 29.7778 41.5599 29.8584 41.4325 29.8963C38.985 30.6233 33.4928 32.7252 28.4895 37.9564C23.4759 43.1983 18.9944 51.5396 18.5168 64.6709C18.4756 65.8035 19.2194 66.6062 20.1239 66.9166C21.0274 67.2267 22.1702 67.0758 22.9911 66.2377C27.5371 61.5968 35.9964 53.7768 46.0766 48.326C56.16 42.8735 67.7755 39.8368 78.719 44.5944C79.2406 44.8212 79.8061 44.6962 80.194 44.3774C80.5859 44.0552 80.8113 43.5165 80.6098 42.9704L41.6006 29.4522Z" fill="#A3E440" stroke="black"/>
<path d="M78.8277 44.5183L78.8276 44.5183C67.8649 39.7514 56.2292 42.796 46.1281 48.2614C36.0303 53.7251 27.5559 61.5629 23.0011 66.2141C22.18 67.0542 21.0355 67.2058 20.1304 66.8953C19.2241 66.5844 18.4786 65.7801 18.5198 64.6449L78.8277 44.5183ZM78.8277 44.5183C79.3504 44.7455 79.9174 44.6224 80.3072 44.3027C80.7013 43.9794 80.9258 43.4391 80.7238 42.8915M78.8277 44.5183L18.9407 59.4666M18.9407 59.4666L19.2897 59.3721C19.5578 59.2996 19.8173 59.1552 20.0426 58.9263C24.6495 54.2213 33.2715 46.2424 43.5727 40.6999C53.8714 35.1587 65.939 32.0078 77.348 37.1298L77.4533 37.1771L77.5236 37.2665C79.2537 39.4688 80.2109 41.5 80.7238 42.8915M18.9407 59.4666L18.8975 59.8166M18.9407 59.4666L18.8975 59.8166M80.7238 42.8915L80.2479 43.0823L80.7238 42.8914C80.7238 42.8914 80.7238 42.8915 80.7238 42.8915ZM18.8975 59.8166C18.7084 61.3478 18.5798 62.957 18.5198 64.6448L18.8975 59.8166Z" fill="#99D53B" stroke="black"/>
<path d="M81.8803 45.3879L81.8804 45.3879C89.3005 36.0483 97.6703 32.2798 105.168 31.1638C112.685 30.0451 119.356 31.5886 123.345 32.927C124.355 33.2656 125.382 32.9786 126.07 32.3558C126.762 31.7299 127.115 30.7573 126.755 29.7833C125.445 26.2342 122.821 21.1253 117.875 17.7963C112.901 14.4486 105.65 12.9493 95.2177 16.5025C86.0598 19.6216 81.8312 25.3776 80.0518 31.0522C78.2832 36.6924 78.9418 42.2177 79.4675 44.938C79.5753 45.4959 80.0213 45.8254 80.4894 45.9098C80.9567 45.9939 81.5152 45.8475 81.8803 45.3879Z" fill="#1CA56F" stroke="black"/>
<path d="M123.443 32.8788L123.444 32.879C124.456 33.2174 125.484 32.9289 126.173 32.3045C126.865 31.6773 127.217 30.7034 126.859 29.7284L126.859 29.7276C126.127 27.7477 124.994 25.295 123.285 22.9332L122.724 22.1586L122.392 23.095C122.149 23.7791 121.324 24.3123 120.398 24.0693C116.253 22.974 109.362 21.8331 101.774 23.4141C94.1679 24.9989 85.8908 29.3139 79.0075 39.0777L78.9104 39.2153L78.9128 39.3782C78.9452 41.6638 79.2255 43.6063 79.4778 44.9153L79.4778 44.9154C79.6906 46.018 81.1831 46.2714 81.8964 45.373L81.8964 45.373C89.331 36.0065 97.7173 32.2276 105.23 31.109C112.762 29.9876 119.446 31.5361 123.443 32.8788Z" fill="#158F5E" stroke="black"/>
<path d="M61.2735 111.852L61.197 112.327L61.675 112.393L67.9902 113.268C69.7393 113.51 71.4789 112.393 71.8152 110.695C72.1516 108.997 70.9362 107.471 69.1868 107.228L69.1867 107.228L62.7295 106.334L62.2244 106.264L62.1351 106.765C61.8372 108.438 61.5501 110.134 61.2735 111.852Z" fill="#D68A5A" stroke="black"/>
<path d="M59.5101 126.903L59.464 127.354L59.9154 127.416L68.1675 128.562C69.9198 128.805 71.6607 127.686 71.9979 125.98C72.3344 124.278 71.1184 122.746 69.3655 122.502L69.3654 122.502L60.6937 121.298L60.1618 121.225L60.0956 121.755C59.8837 123.455 59.6873 125.17 59.5101 126.903Z" fill="#D68A5A" stroke="black"/>
<path d="M79.4247 143.474L80.0744 143.565L80.0249 142.92C79.8924 141.197 79.771 139.438 79.668 137.644L79.6461 137.261L79.2609 137.208L69.7496 135.884C67.9898 135.64 66.2521 136.768 65.9157 138.473C65.5794 140.178 66.7912 141.717 68.5511 141.962L79.4247 143.474Z" fill="#D68A5A" stroke="black"/>
<path d="M78.689 99.9087L79.2481 99.9861L79.2897 99.4271C79.4157 97.7372 79.56 96.029 79.7226 94.3027L79.7648 93.8553L79.3171 93.7933L73.7613 93.0241C72.0124 92.7819 70.2736 93.8987 69.9373 95.5958C69.6003 97.2965 70.8166 98.8187 72.5651 99.0608L78.689 99.9087Z" fill="#D68A5A" stroke="black"/>
<path d="M59.0093 158.743L59.0267 159.131L59.4165 159.185L65.1659 159.982C66.9162 160.224 68.6558 159.106 68.9922 157.407C69.3293 155.705 68.1127 154.18 66.3627 153.938L59.4512 152.98L58.8387 152.895L58.8492 153.506C58.8792 155.248 58.9309 156.997 59.0093 158.743Z" fill="#D68A5A" stroke="black"/>
</svg>
`,
  };
};
