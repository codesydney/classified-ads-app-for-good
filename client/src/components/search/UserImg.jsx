import defaultServiceLogo from '../../assets/serviceImgPlaceholder.svg'
import style from './userImg.module.css'
const ServiceImg = ({ serviceName, serviceLogo }) => {
  return (
    <div style={{ aspectRatio: 4 / 3 }}>
      <img
        src={serviceLogo || defaultServiceLogo}
        alt={`${serviceName} Logo`}
        className="w-full aspect-ratio-4/3 overflow-hidden"
        style={{ objectFit: 'contain', aspectRatio: '4/3' }}
      />
    </div>
  )
}

export default ServiceImg
