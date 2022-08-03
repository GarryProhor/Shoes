import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={280}
    height={560}
    viewBox="0 0 280 580"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    
  >
    <rect x="0" y="0" rx="20" ry="20" width="280" height="360" /> 
    <rect x="3" y="370" rx="10" ry="10" width="270" height="23" /> 
    <rect x="0" y="410" rx="15" ry="15" width="280" height="84" /> 
    <rect x="0" y="525" rx="10" ry="10" width="110" height="35" /> 
    <rect x="122" y="520" rx="10" ry="10" width="155" height="44" />
  </ContentLoader>
)

export default Skeleton

