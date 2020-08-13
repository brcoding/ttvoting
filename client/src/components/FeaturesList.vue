<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Features</h4>

      <div class="newfeaturebackground"><div class="newfeature"><input type="text" class="form-control newfeature" placeholder="New Feature Title"
      v-model="newfeaturetitle"/></div>
      <div class="newfeature"><input type="text" class="form-control newfeature" placeholder="New Feature Description"
      v-model="newfeaturedesc"/></div>
      <button class="btn btn-outline-secondary newfeature" type="button"
        @click="addFeature()"
      >
        Add New Feature
      </button></div>

      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(feature, index) in features"
          :key="index"
          
        >
          <span @click="setActiveFeature(feature, index)">{{ feature.title }} - Votes: {{ feature.votes.length }} </span> <img height="30" src="../assets/plus1.png" @click="voteFeature(feature._id)" />
          <ul class="list-group">
            <li class="list-group-item"
              v-for="(comment, cindex) in feature.comments"
              :key="cindex"
            >
              <div>{{comment.body}}</div>
            </li>
          </ul>
          <span><input type="text" class="form-control" placeholder="Comment"
          v-model="feature.id"/><button class="btn btn-outline-secondary" type="button"
            @click="addFeatureComment(feature._id, feature.id)"
          >
            Add Comment
          </button></span>
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentFeature">
        <h4>Feature</h4>
        <div>
          <label><strong>Votes:</strong></label> {{ currentFeature.votes.length }}
        </div>
        <div>
          <label><strong>Title:</strong></label> {{ currentFeature.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentFeature.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentFeature.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/features/' + currentFeature.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a feature title to see details</p>
      </div>
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

</style>