<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3 searchwrapper">
        <input type="text" class="form-control searchbox" placeholder="Search by title"
          v-model="title" v-on:keyup.enter="searchTitle" />
          <button class="searchbutton" type="button"
            @click="searchTitle"
          >
            Search
          </button>
      </div>
    </div>
    <div class="col-md-6">
      <ul class="list-group">
      <h4>Request New Feature</h4>
      <i>Before requesting a new feature please use search to ensure it has not already been added.</i>
      <div class="newfeaturebackground">
        <div class="newfeature">
          <input type="text" class="form-control newfeature" placeholder="New Feature Title" v-model="newfeaturetitle"/>
        </div>
        <div class="newfeature">
          <input type="text" class="form-control newfeature" placeholder="New Feature Description" v-model="newfeaturedesc"/>
        </div>
        <button class="btn btn-outline-secondary newfeature" type="button"
          @click="addFeature()"
        >
          Request New Feature
        </button>
      </div>
      <h4>Features</h4>
      </ul>

      <ul class="list-group">
        <li class="listtitle"
          :class="{ active: index == currentIndex }"
          v-for="(feature, index) in features"
          :key="index"
          
        >
          <div class="featurewrapper">
            <p class="featuretitle" @click="setActiveFeature(feature, index)">{{ feature.title }} <br>
            <span style="float: left;" class="featuredesc" @click="setActiveFeature(feature, index)">{{ feature.description }}</span>
            </p>

            <p class="featurevotes">Votes: {{ feature.votes.length }}  <img height="30" src="../assets/plus1.png" @click="voteFeature(feature._id)" /></p>
          </div>
          <div style="clear: both;"></div>
          
          <ul class="list-group">
            <li class="listcomment"
              v-for="(comment, cindex) in feature.comments"
              :key="cindex"
            >
              <span>{{comment.body}}</span>
            </li>
          </ul>
          <div class="addcomment"><input type="text" class="form-control" placeholder="Comment"
          v-model="feature.id"/><button class="btn btn-outline-secondary" type="button"
            @click="addFeatureComment(feature._id, feature.id)"
          >
            Add Comment
          </button></div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import FeaturesDataService from "../services/FeaturesDataService";
export default {
  name: "features-list",
  data() {
    return {
      newfeaturetitle: "",
      newfeaturedesc: "",
      features: [],
      currentFeature: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveFeatures() {
      FeaturesDataService.getAll()
        .then(response => {
          this.features = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveFeatures();
      this.currentFeature = null;
      this.currentIndex = -1;
    },
    voteFeature(id) {
      FeaturesDataService.vote(id).then(voteresp => {
        console.log(voteresp);
        FeaturesDataService.findByTitle(this.title)
          .then(response => {
            this.features = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      });
    },
    addFeature() {
      FeaturesDataService.create({title: this.newfeaturetitle, description: this.newfeaturedesc}).then(commentResp => {
        console.log(commentResp);
        FeaturesDataService.findByTitle(this.title)
          .then(response => {
            this.features = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      });
    },
    addFeatureComment(id, commentdata) {
      FeaturesDataService.comment(id, {comment: commentdata}).then(commentResp => {
        console.log(commentResp);
        FeaturesDataService.findByTitle(this.title)
          .then(response => {
            this.features = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      });
    },
    setActiveFeature(feature, index) {
      this.currentFeature = feature;
      this.currentIndex = index;
    },

    
    searchTitle() {
      FeaturesDataService.findByTitle(this.title)
        .then(response => {
          this.features = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveFeatures();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
input.newfeature {
  width: 400px;  
}
.newfeature {
  margin: 7px;
}
.newfeaturebackground {
  max-width: 440px;
  margin: 10px;
  border: 1px solid white;
  background: #333;
}
.featurewrapper {
  min-width: 750px;
  width: 750px;
}
.featuretitle {
  margin: 10px;
  float: left;
  width: 600px;
  font-size: 150%;
}
.featuredesc {
  font-size: 70%;
  margin: 7px;
  color: #888;
}
.listcomment {
    margin: 4px;
    list-style-type: none;
}
li.listcomment:before {
  content: "-"; /* Insert content that looks like bullets */
  padding-right: 8px;
  color: #888; /* Or a color you prefer */
}
.listtitle {
    background-color: #3A2e26;
    list-style-type: none;
    margin: 15px;
    width: 750px;
}
.addcomment {
  margin-left: 40px;
  padding: 15px;
}

.featurevotes {
  float: right;
  text-align: right;
  
}

.searchwrapper {
  margin: auto;
  
}

.searchbox {
  margin-top: 40px;
  margin-left: 75px;
  margin-bottom: 30px;
  width: 580px;
  height: 24px;
  text-align: left;
  font-size: 90%;
}

.searchbutton {
  height: 30px;
  margin: 3px;
  font-size: 90%;
}
</style>