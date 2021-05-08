<!--orig: https://codepen.io/rajcsanyiz/pen/qorEpz-->
<template>
  <div class="gallery">
    <h1>{{ title }} <small></small></h1>
    <div class="row">
      <div v-for="photo in photos" class="photo-frame" @click="showPhoto(photo.id)">
        <div class="photo" :style="{ backgroundImage: 'url(' + photo.urlThumbnail + ')' }"></div>
      </div>
    </div>
    <div class="row">
      <div class="pager-frame">
        <ul class="pager-frame">
          <li v-for="page in idxLastPage" class="page" :class="{ active: (idxCurrentPage+1) == page }" @click="paginate(page-1)">
            <a href="#">{{ page }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div id="overlay" v-show="isShowPhoto" @click="isShowPhoto=false"></div>
  <div id="layout" v-show="isShowPhoto" @click="isShowPhoto=false">
    <img :src="showPhotoUrl" alt="">
    <div class="prev" @click.stop="goPrevPhoto()">&lt;</div>
    <div class="next" @click.stop="goNextPhoto()">&gt;</div>
    <div class="status">
      {{ idxCurrentPhoto+1 }} / {{ idxLastPhoto+1 }}
    </div>
  </div>
</template>

<script>
var allPhotos = getPhotos();
export default {
  name: "TheGallery",
  data(){
    return{
      title: 'Сертификаты Яны',
      allPhotos: allPhotos, // all photos
      photos: [],           // photos in the current page
      photosPerPage: 12,    // photos per page
      idxLastPhoto: 0,      // last photo's id
      idxCurrentPage: 0,    // current photo's id
      idxLastPage: 0,       // last page's id
      isShowPhoto: false,   //
      showPhotoUrl: '',     // selected photo url
      idxCurrentPhoto: 0    // current photo index
    }
  },
  mounted: function() {
    // init indexes
    this.idxLastPhoto = this.allPhotos.length-1;
    this.idxLastPage = Math.floor(this.allPhotos.length / this.photosPerPage);

    // show first page
    this.paginate(0);

    document.addEventListener("keydown", e => {
      if (this.isShowPhoto && e.keyCode == 27) {
        this.isShowPhoto = false;
      }
    });
  },
  methods: {
    /** Paginate photos / Rebuild photos array
     *
     */
    paginate: function(idxPage) {
      this.idxCurrentPage = idxPage;

      // determine period
      var idxStart = Math.floor(idxPage*this.photosPerPage);
      var idxEnd = idxStart+this.photosPerPage>this.idxLastPhoto+1?this.idxLastPhoto:idxStart+this.photosPerPage;

      // drop the visible photos
      this.photos.splice(0, this.photos.length)

      // reload visible photos from all photo
      for(var idx = idxStart; idx < idxEnd; idx++) {
        this.photos.push(this.allPhotos[idx]);
      }
    },

    /**
     * Show image preview larger
     */
    showPhoto: function(id) {
      var that = this;

      // find photo data by id
      this.allPhotos.forEach(function(photo, idx) {
        if (photo.id === id) {
          // lock background and show photo
          that.isShowPhoto = true;
          that.showPhotoUrl = photo.urlPhoto;
          that.idxCurrentPhoto = idx;

          // go top of the page
          window.scrollTo(0,0);
        }
      });
    },
    goPrevPhoto: function() {
      var current = this.idxCurrentPhoto;
      this.showPhoto(this.allPhotos[current === 0 ? this.idxLastPhoto : current-1].id);

    },
    goNextPhoto: function() {
      var current = this.idxCurrentPhoto;
      this.showPhoto(this.allPhotos[current === this.idxLastPhoto ? 0 : current+1].id);
    }
  }
}

function getPhotos() {
  let pexelIds = [];

  for (let i = 1; i < 35; i++) { //34 - количество фотографий
    pexelIds.push(i)
  }

  var photos = [];
  pexelIds.forEach(function(id) {
    photos.push({
      urlPhoto: require(`../src/assets/certif/cert-${id}.png`),
      urlThumbnail: 'https://images.pexels.com/photos/'+id+'/pexels-photo-'+id+'.jpeg?w=400&h=400&auto=compress&cs=tinysrgb',
      id: id
    });
  });

  return photos;
};
</script>

<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css?family=PT+Sans+Narrow");
  @import './assets/TheGallery.scss';
</style>