import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons'
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types'
import { SnsLinkItemProps } from './SnsLinkItem.type'

const SnsLinkItem = ({title, link, onClick}:SnsLinkItemProps) => {
  return (
    <div className='px-32pxr pb-24pxr pt-16pxr bg-gray-700 flex flex-col w-668pxr justify-center rounded-12pxr gap-y-3pxr'>
        <span className='text-t5-bd'>{title}</span>
        <div className='flex items-center justify-between'>
          <span className='text-t7-rg hover:underline cursor-pointer'>{link}</span>
          <div onClick={onClick} className='cursor-pointer'>
            <FeatureTabIcons state={FeatureTabIconsState.COPY} />
          </div>
        </div>
    </div>
  )
}

export default SnsLinkItem
