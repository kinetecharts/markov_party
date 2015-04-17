"use strict";

var stateNames=['sitting', 'walking', 'running', 'hugging', 'following'];

var statesJson=[
    {
        name:"sitting",
        image:null,
        active:true,
        transitionProbabilities:{
            sitting:0.7,
            walking:0.2,
            running:0.1,
            hugging:0.1,
            following:0.2
        }
    },
    {
        name:"walking",
        image:null,
        active:false,
        transitionProbabilities:{
            sitting:0.2,
            walking:0.7,
            running:0.1,
            hugging:0.1,
            following:0.2
        }
    },
    {
        name:"running",
        image:null,
        active:false,
        transitionProbabilities:{
            sitting:0.1,
            walking:0.2,
            running:0.7,
            hugging:0.1,
            following:0.2
        }
    },
    {
        name:"hugging",
        image:null,
        active:false,
        transitionProbabilities:{
            sitting:0.1,
            walking:0.2,
            running:0.7,
            hugging:0.1,
            following:0.2
        }
    },
    {
        name:"following",
        image:null,
        active:false,
        transitionProbabilities:{
            sitting:0.1,
            walking:0.2,
            running:0.7,
            hugging:0.1,
            following:0.2
        }
    }
];

// $(function () {
var State = Backbone.Model.extend({
    defaults: function(){
        return {
            name:null,
            image:null,
            active:false,
            transitionProbabilities:{}
        };
    },
    start: function(){
        // debugger
        this.set("active", true);
        console.log(this.get("playing"));
    },
    stop: function(){
        this.set("active", false);
        console.log(this.get("playing"));
    },
    setProbability: function(ProbList){
        var tProb = this.attributes.transitionProbabilities;
        var sum=ProbList.sitting+ProbList.walking+ProbList.running+ProbList.hugging+ProbList.following;
        tProb.sitting = ProbList.sitting/sum;
        tProb.walking = ProbList.walking/sum;
        tProb.running = ProbList.running/sum;
        tProb.hugging = ProbList.hugging/sum;
        tProb.following = ProbList.following/sum;
    }
});

var StateList = Backbone.Collection.extend({
    model: State,
    switchState:function(){
        var currentState = this.where({active:true})[0];
        var tProb = currentState.attributes.transitionProbabilities;
        var toss = Math.random();
        var newState = null;
        var newStateName;
        if(toss < tProb.sitting){
            newStateName = 'sitting';
        }else if(toss < tProb.sitting+tProb.walking){
            newStateName = 'walking';
        }else if(toss < tProb.sitting+tProb.walking+tProb.running){
            newStateName = 'running';
        }else if(toss < tProb.sitting+tProb.walking+tProb.running+tProb.hugging){
            newStateName = 'hugging';
        }else{
            newStateName = 'following';
        }

        if(newStateName != currentState.attributes.name){ //state changed
            console.log('switching');
            currentState.set('active', false);
            newState=this.where({name:newStateName})[0];
            newState.set('active', true);
            stateViews.forEach(function(s){
                s.updateCheckbox();
            });
        }
    },
    setProbability:function(ProbList){
        var that = this;
        _.each(ProbList, function(list){
            // debugger
            var state = that.where({name:list.name})[0];
            console.log(list.name);
            if(state == undefined) debugger
            state.setProbability(list.transitionProbabilities);            
        });
        stateViews.forEach(function(s){
            s.updateSliders();
        });
    }
});

var states = _.map(statesJson, function(s){return new State(s);});
var stateList=new StateList(states);
stateList.where({active:true})

var StateView = Backbone.View.extend({
    tagName: "li",
    template: _.template($('#state-template').html()),
    initialize: function(){
        console.log("sv init");
        $('#state-list').append(this.render().el);
        // debugger
        this.$('#slider-sitting').slider({min:0, max:1, step:0.01});
        this.$('#slider-sitting').slider('value', this.model.attributes.transitionProbabilities.sitting);
        this.$('#slider-walking').slider({min:0, max:1, step:0.01});
        this.$('#slider-walking').slider('value', this.model.attributes.transitionProbabilities.walking);
        this.$('#slider-running').slider({min:0, max:1, step:0.01});
        this.$('#slider-running').slider('value', this.model.attributes.transitionProbabilities.running);
        this.$('#slider-hugging').slider({min:0, max:1, step:0.01});
        this.$('#slider-hugging').slider('value', this.model.attributes.transitionProbabilities.hugging);
        this.$('#slider-following').slider({min:0, max:1, step:0.01});
        this.$('#slider-following').slider('value', this.model.attributes.transitionProbabilities.following);
        this.updateCheckbox();
    },
    render: function(){
        console.log("render");
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events:{
        "slidechange": "updateSliderVal",
        "click .toggle": "toggleActive"
    },
    updateSliderVal: function(e){
        if(e.originalEvent == undefined) return; //detect non mouse related event, and not processing it
        var tProb = this.model.attributes.transitionProbabilities;
        var id=e.target.id;
        var name=id.split('-')[1]; //"slider-sitting" => "sitting"
        var val = this.$('#'+id).slider('value');
        tProb[name] = val;
        var nOther=_.without(stateNames, name);
        var numState = nOther.length;
        var total = _.reduce(nOther, function(sum, x){
            return sum + tProb[x];
        }, 0);
        // var val0=tProb[nOther[0]];
        // var val1=tProb[nOther[1]];
        // debugger
        // var total = val+val0+val1;
        // if(val0+val1 > 0){
            // debugger
        var scope = this;
        var ratio = (1.0 - val) / (total - val);
        _.each(nOther, function(x){
            tProb[x] = tProb[x]*ratio;
            scope.$('#slider-'+x).slider('value', tProb[x]);
        })  
            // val0 *=ratio;
            // val1 *=ratio;
            // tProb[nOther[0]]=val0;
            // this.$('#slider-'+nOther[0]).slider('value', val0);
            // tProb[nOther[1]]=val1;
            // this.$('#slider-'+nOther[1]).slider('value', val1);
        // }
    },
    toggleActive: function(){
        this.model.attributes.active = ! this.model.attributes.active;
        if(this.model.attributes.active){
            // debugger
            var others = _.without(stateNames, this.model.attributes.name);
            others.forEach(function(n){
                stateList.where({name:n})[0].attributes.active = false;
            });
            stateViews.forEach(function(s){
                s.updateCheckbox();
            });
        }
    },
    updateCheckbox: function(){
        this.$('.toggle').prop('checked', this.model.attributes.active);
        if(this.model.attributes.active){
            $('#image-'+this.model.attributes.name).show();
        }else{
            $('#image-'+this.model.attributes.name).hide();
        }
    },
    updateSliders: function(){
        this.$('#slider-sitting').slider('value', this.model.attributes.transitionProbabilities.sitting);
        this.$('#slider-walking').slider('value', this.model.attributes.transitionProbabilities.walking);
        this.$('#slider-running').slider('value', this.model.attributes.transitionProbabilities.running);
        this.$('#slider-hugging').slider('value', this.model.attributes.transitionProbabilities.hugging);
        this.$('#slider-following').slider('value', this.model.attributes.transitionProbabilities.following);
    }
});

var stateViews=[];
stateList.models.forEach(function(model){
    var sv = new StateView({model:model});
    stateViews.push(sv);
});


setInterval(function(){
    stateList.switchState();
}, 5000);


$(function(){
    $('#samples').selectmenu()
        .on("selectmenuchange", function(event, ui){
            var name = ui.item.value;
            // debugger
            stateList.setProbability(samples[name]);
        });
    stateList.setProbability(samples.excited);
});

