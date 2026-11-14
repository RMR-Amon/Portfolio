import navy880 from '@/assets/images/profile/slides/navy-880.webp';
import navy440 from '@/assets/images/profile/slides/navy-440.webp';
import suit880 from '@/assets/images/profile/slides/suit-880.webp';
import suit440 from '@/assets/images/profile/slides/suit-440.webp';
import proweb880 from '@/assets/images/profile/slides/proweb-880.webp';
import proweb440 from '@/assets/images/profile/slides/proweb-440.webp';

export interface PortraitPhoto {
  id: string;
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position — keeps the face in frame on every screen size. */
  position?: string;
}

/**
 * Hero gallery photos (4:5). Backgrounds were blurred locally ("portrait mode"),
 * keeping only Maxmudjon sharp. To add a photo: put `<name>-880.webp` and
 * `<name>-440.webp` into assets/images/profile/slides and add an entry here.
 */
export const portraitPhotos: PortraitPhoto[] = [
  {
    id: 'navy',
    src: navy880,
    srcSet: `${navy440} 440w, ${navy880} 880w`,
    width: 880,
    height: 1100,
    alt: 'Maxmudjon Raximjonov in a navy suit and tie',
    position: '50% 20%',
  },
  {
    id: 'suit',
    src: suit880,
    srcSet: `${suit440} 440w, ${suit880} 880w`,
    width: 880,
    height: 1100,
    alt: 'Maxmudjon Raximjonov in a dark pinstripe double-breasted suit',
    position: '50% 15%',
  },
  {
    id: 'proweb',
    src: proweb880,
    srcSet: `${proweb440} 440w, ${proweb880} 705w`,
    width: 705,
    height: 881,
    alt: 'Maxmudjon Raximjonov sitting in an armchair in a white T-shirt',
    position: '50% 25%',
  },
];
