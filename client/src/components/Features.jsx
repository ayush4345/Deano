export default function Features() {
  return (
    <section id="features">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="md:w-2/3 lg:w-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-orange-700"
          >
            <path
              fill-rule="evenodd"
              d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
              clip-rule="evenodd"
            />
          </svg>

          <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
            A decentralised approach to annotation and ground truth data creation
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We are building a platform that allows you to annotate your data in
            a decentralised way.
          </p>
        </div>
        <div className="mt-16 mb-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
          {/* Push Protocol */}
                    <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                      <div className="relative space-y-8 py-12 p-8">
                        <img
                          src="https://file.notion.so/f/s/f3f8624f-e79a-441b-a732-1cba0af10134/Bell.png?id=f57cc1cb-9300-4263-b121-0b3eedb15188&table=block&spaceId=95c3c07c-15ae-41e0-b1c2-cc952f688f21&expirationTimestamp=1698069600000&signature=CJjtr9WMGByEvPGsUr1N5tD-ZmF9cn8-arNjrFS0L6M&downloadName=Bell.png"
                          className="w-12"
                          width="512"
                          height="512"
                          alt="notification icon"
                        />

                        <div className="space-y-2">
                          <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-orange-700">
                            Notification using Push Protocol
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300">
                          The Push Protocol serves the essential function of notifying annotators about newly added job listings by vendors. It plays a crucial role in keeping the entire ecosystem up-to-date by delivering notifications that are vital to annotators' work.
                          </p>
                        </div>
                        
                      </div>
                    </div>
          {/* XMTP Chat */}
                    <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                      <div className="relative space-y-8 py-12 p-8">
                        <img
                          src="https://xmtp.org/img/logomark.svg"
                          className="w-12"
                          width="512"
                          height="512"
                          alt="chat icon"
                        />

                        <div className="space-y-2">
                          <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-orange-700">
                            XMTP Chat
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300">
                          Stay seamlessly connected with the Vendor for real-time updates on job listings and address any related queries. Annotators have the convenience of direct communication with vendors for additional job-related updates.
                          </p>
                        </div>
                        
                      </div>
                    </div>
          {/* Privy */}
                    <div className="group relative bg-white dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                      <div className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white dark:group-hover:bg-gray-800">
{/*                         <img
                          src="https://img.icons8.com/ios/50/remove-fingerprint.png"
                          className="w-12"
                          width="512"
                          height="512"
                          alt="authentication icon"
                        /> */}
                        <svg width="129" height="41" viewBox="0 0 129 41" fill="none" xmlns="http://www.w3.org/2000/svg" style="height: 28px; width: 96px;"><path d="M30.2631 37.5605C30.2631 39.2539 23.8315 40.6266 15.8977 40.6266C7.96392 40.6266 1.53231 39.2539 1.53231 37.5605C1.53231 35.8671 7.96392 34.4943 15.8977 34.4943C23.8315 34.4943 30.2631 35.8671 30.2631 37.5605Z" fill="#160B45"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0.455615 24.2448C0.455615 29.1946 5.01917 31.4142 9.48116 31.428C19.9212 31.428 31.4722 25.0107 31.4121 14.2713C31.3688 6.52859 24.2544 -0.0628907 15.8357 0.000452793C7.82477 0.000452793 0.000529064 5.23097 0 12.3567C0 14.2703 1.09781 16.1216 3.96753 16.33C1.57478 18.6994 0.455615 21.5383 0.455615 24.2448ZM15.8632 17.2471C17.5367 17.2471 18.8934 15.617 18.8934 13.6061C18.8934 11.5952 17.5367 9.96502 15.8632 9.96502C14.1897 9.96502 12.8331 11.5952 12.8331 13.6061C12.8331 15.617 14.1897 17.2471 15.8632 17.2471ZM24.5514 17.2472C26.2249 17.2472 27.5816 15.617 27.5816 13.6061C27.5816 11.5952 26.2249 9.96503 24.5514 9.96503C22.8779 9.96503 21.5213 11.5952 21.5213 13.6061C21.5213 15.617 22.8779 17.2472 24.5514 17.2472Z" fill="#FF8271"></path><path d="M45.3547 33.1573C45.8638 33.1573 46.2804 32.7376 46.2804 32.2246C46.2804 29.5186 46.2804 26.8126 46.2804 24.1066C47.9005 24.1066 49.5206 24.1066 51.1406 24.1066C56.7414 24.1066 60.861 19.9557 60.861 14.3125C60.861 8.66924 56.7414 4.51841 51.1406 4.51841H42.8089C42.2997 4.51841 41.8831 4.93816 41.8831 5.45118V32.2246C41.8831 32.7376 42.2997 33.1573 42.8089 33.1573H45.3547ZM46.2804 19.6759C46.2804 16.1003 46.2804 12.5247 46.2804 8.94907C47.9005 8.94907 49.5206 8.94907 51.1406 8.94907C54.1956 8.94907 56.3248 11.1411 56.3248 14.3125C56.3248 17.4839 54.1956 19.6759 51.1406 19.6759C49.5206 19.6759 47.9005 19.6759 46.2804 19.6759Z" fill="#160B45"></path><path d="M66.8609 33.1573C67.3701 33.1573 67.7867 32.7376 67.7867 32.2246V21.0313C67.7867 16.0877 71.0731 14.2221 74.7298 14.2221H75.6555C76.1647 14.2221 76.5813 13.8024 76.5813 13.2894V10.7709C76.5813 10.2579 76.1647 9.83811 75.6555 9.83811H74.7298C69.1743 9.83811 67.2555 13.6935 67.2555 13.6935C67.2555 13.6935 67.2555 11.2893 67.2555 10.7709C67.2555 10.0349 66.8389 9.83811 66.3297 9.83811H64.5465C64.0374 9.83811 63.6208 10.2579 63.6208 10.7709V32.2246C63.6208 32.7376 64.0374 33.1573 64.5465 33.1573H66.8609Z" fill="#160B45"></path><path d="M82.5484 33.1573C83.0575 33.1573 83.4741 32.7376 83.4741 32.2246V10.7709C83.4741 10.2579 83.0575 9.83811 82.5484 9.83811H80.1414C79.6323 9.83811 79.2157 10.2579 79.2157 10.7709V32.2246C79.2157 32.7376 79.6323 33.1573 80.1414 33.1573H82.5484Z" fill="#160B45"></path><path d="M97.8721 33.1573C98.2886 33.1573 98.5664 32.9241 98.7515 32.4578L106.759 11.2839C106.852 11.0507 106.944 10.7709 106.944 10.491C106.944 10.1646 106.574 9.83811 106.019 9.83811H103.149C102.732 9.83811 102.455 10.0247 102.269 10.5377C100.396 15.9569 96.5701 26.4462 96.5701 26.4462C96.5701 26.4462 92.7606 15.9694 90.8827 10.5377C90.6975 10.0247 90.4198 9.83811 90.0032 9.83811H87.1334C86.5779 9.83811 86.2076 10.1646 86.2076 10.5377C86.2076 10.7709 86.3002 11.0507 86.3928 11.2839L94.4468 32.4578C94.6319 32.9241 94.9097 33.1573 95.3263 33.1573H97.8721Z" fill="#160B45"></path><path d="M117.084 40.6266C117.5 40.6266 117.778 40.4401 117.963 39.9271L128.815 11.2839C128.907 11.0507 129 10.7709 129 10.5377C129 10.1646 128.63 9.83811 128.074 9.83811H125.251C124.834 9.83811 124.556 10.0247 124.371 10.5377C122.635 15.5261 118.909 26.4462 118.909 26.4462C118.909 26.4462 114.924 15.5774 113.031 10.5377C112.846 10.0247 112.568 9.83811 112.151 9.83811H109.328C108.772 9.83811 108.402 10.1646 108.402 10.5377C108.402 10.7709 108.495 11.0507 108.587 11.2839L116.317 31.0586C116.41 31.2918 116.456 31.4317 116.456 31.525C116.456 31.6649 116.41 31.7582 116.317 32.038L113.797 39.2741C113.705 39.5073 113.658 39.6939 113.658 39.8804C113.658 40.2535 113.982 40.6266 114.584 40.6266H117.084Z" fill="#160B45"></path></svg>

                        <div className="space-y-2">
                          <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-orange-700">
                          Seemless Authentication using Privy
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300">
                        Deano leverages Privy for smooth user onboarding, allowing users to authenticate using their email address and social logins. This streamlined process simplifies their entry into the web3 world.
                          </p>
                        </div>
                        
                      </div>
                    </div>
          {/* Sismo */}
                    <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                      <div className="relative space-y-8 py-12 p-8">
                        <img
                          src="https://github.com/ayush4345/Deano/assets/99096397/6d6ae26f-a8b8-4654-bbdf-1d387fff79ea"
                          className="w-12"
                          width="512"
                          height="512"
                          alt="sismo icon"
                        />

                        <div className="space-y-2">
                          <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-orange-700">
                            Sismo
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300">
                          Sismo plays a pivotal role in providing periodic salaries to our annotators based on their reputation metrics. It offers the capability to selectively distribute payouts exclusively within the Deano platform, ensuring financial transactions remain within our ecosystem.
                          </p>
                        </div>
                        
                      </div>
                    </div>
          {/* Tableland */}
                    <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                      <div className="relative space-y-8 py-12 p-8">
                        <img
                          src="https://tableland.xyz/_next/static/media/black.bb0834aa.svg"
                          className="w-12"
                          width="512"
                          height="512"
                          alt="tableland icon"
                        />

                        <div className="space-y-2">
                          <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-orange-700">
                            Tableland
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300">
                          Tableland is a crucial component of Deano's infrastructure, serving as a comprehensive solution for the streamlined management of vendor job listings. It acts as the backbone of all the datasets within Deano, streamlining the web3 layer on top of the storage.
                          </p>
                        </div>
                        
                      </div>
                    </div>
          {/* Graph */}
                    <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                      <div className="relative space-y-8 py-12 p-8">
                        <img
                          src="https://github.com/ayush4345/Deano/assets/99096397/d208b37d-43f3-4846-beb3-fec2af9f62c5"
                          className="w-12"
                          width="512"
                          height="512"
                          alt="graph icon"
                        />

                        <div className="space-y-2">
                          <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-orange-700">
                            The Graph
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300">
                          Our utilization of The Graph extends to the development of a dynamic leaderboard system. This system ranks the most distinguished annotators and vendors based on their reputation, providing a transparent and insightful view of their contributions to the Deano platform.
                          </p>
                        </div>
                        
                      </div>
                    </div>
          {/* web3.storage */}
          <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                      <div className="relative space-y-8 py-12 p-8">
                        <img
                          src="https://img.icons8.com/nolan/64/cloud-storage.png"
                          className="w-12"
                          width="512"
                          height="512"
                          alt="tableland icon"
                        />

                        <div className="space-y-2">
                          <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-orange-700">
                            web3.storage
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300">
                          web3.storage occupies a central role in our infrastructure, serving as the repository for both images and their associated information uploaded by vendors on the blockchain. This crucial function ensures secure and reliable data storage within the Deano platform.
                          </p>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }
