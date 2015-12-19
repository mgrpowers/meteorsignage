Rides = new Mongo.Collection("rides");

if (Meteor.isClient) {
  Rides.find().observeChanges({
    changed: function(id,fields) {
      console.log(id)
      console.log(fields.down)
      playAudio(fields.down);
    }
  })
  Template.rides.helpers({
    tasks: function () {
      return Rides.find({});
    }
  });
  Template.body.events({
    "submit .new-ride": function(event) {
      event.preventDefault();
      var ride = event.target.ridename.value;

      Rides.insert({
        ride: ride,
        down: false,
        createdAt: new Date()
      });

      event.target.ridename.value = "";
    },
    "click .ride-down-btn": function() {
      Rides.update(this._id, {
        $set: {down: !this.down}
      })

    }
  });
}


function playAudio(down) {
  if (down) {
    var audio = new Audio('ridedownsound.mp3');
    audio.addEventListener('canplaythrough', function() {
      audio.play();
    });
  } else {
    var audio = new Audio('rideupsound.mp3');
    audio.addEventListener('canplaythrough', function() {
      audio.play();
    });
  }
  console.log("pewwww")
}
