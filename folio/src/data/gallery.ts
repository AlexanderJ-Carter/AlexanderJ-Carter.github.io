export type GalleryCategoryId =
  | 'all'
  | 'landscape'
  | 'nature'
  | 'food'
  | 'architecture'
  | 'street'

export type GalleryItem = {
  id: string
  category: Exclude<GalleryCategoryId, 'all'>
  src: string
  title: string
}

export const galleryCategories: { id: GalleryCategoryId; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'landscape', label: '风景' },
  { id: 'nature', label: '自然' },
  { id: 'food', label: '美食' },
]

/** Local contact-sheet frames (md webp under public/img/gallery-optimized). */
export const galleryItems: GalleryItem[] = [
  { id: 'landscape-01', category: 'landscape', src: '/img/gallery-optimized/landscape-01-md.webp', title: '山间晨雾' },
  { id: 'landscape-02', category: 'landscape', src: '/img/gallery-optimized/landscape-02-md.webp', title: '远山层叠' },
  { id: 'landscape-03', category: 'landscape', src: '/img/gallery-optimized/landscape-03-md.webp', title: '湖面反光' },
  { id: 'landscape-04', category: 'landscape', src: '/img/gallery-optimized/landscape-04-md.webp', title: '峡谷光线' },
  { id: 'landscape-05', category: 'landscape', src: '/img/gallery-optimized/landscape-05-md.webp', title: '暮色天际' },
  { id: 'landscape-06', category: 'landscape', src: '/img/gallery-optimized/landscape-06-md.webp', title: '云海边缘' },
  { id: 'landscape-07', category: 'landscape', src: '/img/gallery-optimized/landscape-07-md.webp', title: '旷野小路' },
  { id: 'landscape-08', category: 'landscape', src: '/img/gallery-optimized/landscape-08-md.webp', title: '海岸线' },
  { id: 'landscape-09', category: 'landscape', src: '/img/gallery-optimized/landscape-09-md.webp', title: '雪线之上' },
  { id: 'landscape-10', category: 'landscape', src: '/img/gallery-optimized/landscape-10-md.webp', title: '河谷晨光' },
  { id: 'landscape-11', category: 'landscape', src: '/img/gallery-optimized/landscape-11-md.webp', title: '峰峦剪影' },
  { id: 'landscape-12', category: 'landscape', src: '/img/gallery-optimized/landscape-12-md.webp', title: '薄雾林缘' },
  { id: 'landscape-13', category: 'landscape', src: '/img/gallery-optimized/landscape-13-md.webp', title: '高原空旷' },
  { id: 'nature-01', category: 'nature', src: '/img/gallery-optimized/nature-flower-01-md.webp', title: '雨后花瓣' },
  { id: 'nature-02', category: 'nature', src: '/img/gallery-optimized/nature-flower-02-md.webp', title: '近处的花' },
  { id: 'food-01', category: 'food', src: '/img/gallery-optimized/food-01-md.webp', title: '桌上的光' },
  { id: 'food-02', category: 'food', src: '/img/gallery-optimized/food-02-md.webp', title: '精致甜点' },
  { id: 'food-03', category: 'food', src: '/img/gallery-optimized/food-03-md.webp', title: '侧光餐盘' },
]
