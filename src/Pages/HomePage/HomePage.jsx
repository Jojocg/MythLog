
export default function HomePage() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{  
          backgroundImage: "url(https://images.unsplash.com/photo-1661501760606-88ee3a22d645?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          /* https://images.unsplash.com/photo-1566194960855-8d2f9d281220?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D */
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">Discover the Fascinating World of Greek Gods at MythLog</h1>
            <p className="mb-5">
              Explore Greek deities with our interactive platform
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
