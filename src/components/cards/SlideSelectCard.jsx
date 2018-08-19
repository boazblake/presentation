const m = require('mithril');

import { contains, without, not, lensProp, over, compose } from 'ramda';

import SlideSelectField from './SlideSelectField.jsx';
import User from './../../services/user.js';
import { viewModelMap } from './../../models/index.js';

const slidesModel = viewModelMap({ isSelected: Stream(false), position: 0 });

const SlideSelectCard = {
  oninit: vnode => {
    User.setSlides(vnode.attrs.slide);
    vnode.state = slidesModel();
  },
  view: vnode => {
    const slides = vnode.attrs.slide.slides;
    console.log(vnode);
    return slides.map(slide => {
      return (
        <div class="thumb-card card" draggable="true">
          <div class="slide-fields">
            <SlideSelectField fieldValue={`${slide.title}`} />
            <SlideSelectField
              action={() => User.toggleSelection(slide)}
              fieldColor={{ color: setColor(User.slideShow)(slide) }}
              fieldValue={<i class="fa fa-star" />}
            />
            <SlideSelectField
              action={() => editCard(slide)}
              fieldValue={<i class="fas fa-pen-alt" />}
            />
          </div>
        </div>
      );
    });
  }
};

const selectedLens = lensProp('isSelected');

const setColor = slideshow => slide =>
  contains(slide, slideshow) ? 'yellow' : 'green';

export const editCard = slide => m.route.set(`/editor/${slide.id}`);

export default SlideSelectCard;
