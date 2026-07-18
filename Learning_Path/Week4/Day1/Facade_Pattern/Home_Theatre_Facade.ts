class HomeTheatreFacade {
  constructor (
    private lights: Lights,
    private tv: TV, 
    private speakers: Speakers, 
    private blinds: Blinds, 
    private thermostat: Thermostat,
    private popcorn: Popcorn
  ) {}

  startMovieMode(): void {
    console.log("Starting the Movie....")
    this.lights.dim(20);
    this.lights.setColor("warm");
    this.tv.on();
    this.speakers.on();
    this.speakers.setMode("surround");
    this.speakers.setVolume(40);
    this.blinds.close();
    this.thermostat.setTemp(22);
    this.popcorn.start();
  }

  endMovieMode(): void {
    console.log("Engind Movie Mode")
    this.popcorn.stop();
    this.speakers.off();
    this.tv.off();
    this.lights.on();
    this.blinds.open();
  }

  startGamingMode(): void {
    console.log("Starting Gaming mode")
    this.lights.dim(40);
    this.lights.setColor("blue")
    this.tv.on();
    this.tv.setInput("HDMI2")
    this.speakers.on();
    this.speakers.setMode("gmaing");
  }
}


HomeTheatreFacade.startMoveMode();
