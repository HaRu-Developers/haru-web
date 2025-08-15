'use client'

import SnsLinkItem from "@features/sns-event-assistant/SnsLinkItem/SnsLinkItem.client";

const SnsLinkItemList = () => {
  const items = [
    {
      title: 'title1',
      link: 'https://example.com/1',
    },
    {
      title: 'title2',
      link: 'https://example.com/2',
    },
    {
      title: 'title3',
      link: 'https://example.com/3',
    },
  ]
  return (
    <div className="flex flex-col gap-y-12pxr">
      {items.map((item, index) => (
        <SnsLinkItem key={index} title={item.title} link={item.link} onClick={() => {}} />
      ))}
    </div>
  )
}

export default SnsLinkItemList
