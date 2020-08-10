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
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(feature, index) in features"
          :key="index"
          @click="setActiveFeature(feature, index)"
        >
          {{ feature.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllFeatures">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentFeature">
        <h4>Feature</h4>
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
        <p>Please click on a Feature to see comments</p>
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
      features: [],
      currentFeature: null,
      currentIndex: -1,
      title: ""
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
    setActiveFeature(tutorial, index) {
      this.currentFeature = tutorial;
      this.currentIndex = index;
    },
    removeAllFeatures() {
      FeaturesDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
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
</style>