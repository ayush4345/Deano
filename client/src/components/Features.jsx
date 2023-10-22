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
                          src="https://img.icons8.com/nolan/64/appointment-reminders.png"
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
                          src="https://img.icons8.com/doodle/48/chat.png"
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
                        <img
                          src="https://img.icons8.com/ios/50/remove-fingerprint.png"
                          className="w-12"
                          width="512"
                          height="512"
                          alt="authentication icon"
                        />

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
                          src="https://img.icons8.com/nolan/64/code--v2.png"
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
                          src="https://img.icons8.com/pulsar-color/48/table-1.png"
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
                          src="https://img.icons8.com/dusk/64/graph.png"
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
