(function() {

  window.AgentModel = (function() {
    var mergeObjectInto;

    function AgentModel() {
      this.turtles = {};
      this.patches = {};
      this.links = {};
      this.observer = {};
      this.world = {};
    }

    AgentModel.prototype.update = function(modelUpdate) {
      var linkId, linkUpdates, patchId, patchUpdates, turtleId, turtleUpdates, worldUpdate, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      turtleUpdates = modelUpdate.turtles;
      if (turtleUpdates) {
        _ref = Object.keys(turtleUpdates);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          turtleId = _ref[_i];
          if (isFinite(turtleId)) {
            this.updateTurtle(turtleId, turtleUpdates[turtleId]);
          }
        }
      }
      linkUpdates = modelUpdate.links;
      if (linkUpdates) {
        _ref1 = Object.keys(linkUpdates);
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          linkId = _ref1[_j];
          this.updateLink(linkId, linkUpdates[linkId]);
        }
      }
      if ((modelUpdate.world != null) && (modelUpdate.world[0] != null)) {
        worldUpdate = modelUpdate.world[0];
        mergeObjectInto(modelUpdate.world[0], this.world);
        if ((worldUpdate.worldWidth != null) && (worldUpdate.worldHeight != null)) {
          this.patches = {};
        }
      }
      patchUpdates = modelUpdate.patches;
      if (patchUpdates) {
        _ref2 = Object.keys(patchUpdates);
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          patchId = _ref2[_k];
          this.updatePatches(patchId, patchUpdates[patchId]);
        }
      }
      if ((modelUpdate.observer != null) && (modelUpdate.observer[0] != null)) {
        mergeObjectInto(modelUpdate.observer[0], this.observer);
      }
    };

    AgentModel.prototype.updateTurtle = function(turtleId, varUpdates) {
      var t;
      if (varUpdates === null || varUpdates['WHO'] === -1) {
        return delete this.turtles[turtleId];
      } else {
        t = this.turtles[turtleId];
        if (!(t != null)) {
          t = this.turtles[turtleId] = {
            heading: 360 * Math.random(),
            xcor: 0,
            ycor: 0,
            shape: 'default',
            color: 'hsl(' + (360 * Math.random()) + ',100%,50%)'
          };
        }
        return mergeObjectInto(varUpdates, t);
      }
    };

    AgentModel.prototype.updateLink = function(linkId, varUpdates) {
      var l;
      if (varUpdates === null) {
        return delete this.links[linkId];
      } else {
        l = this.links[linkId];
        if (!(l != null)) {
          l = this.links[linkId] = {
            shape: 'default',
            color: 5
          };
        }
        return mergeObjectInto(varUpdates, l);
      }
    };

    AgentModel.prototype.updatePatches = function(patchId, varUpdates) {
      var p;
      p = this.patches[patchId];
      if (p == null) {
        p = this.patches[patchId] = {};
      }
      return mergeObjectInto(varUpdates, p);
    };

    mergeObjectInto = function(updatedObject, targetObject) {
      var value, variable;
      for (variable in updatedObject) {
        value = updatedObject[variable];
        targetObject[variable.toLowerCase()] = value;
      }
    };

    return AgentModel;

  })();

}).call(this);
