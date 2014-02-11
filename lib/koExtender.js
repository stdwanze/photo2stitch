CanvasKit = window.CanvasKit || {}; ( function(CanvasKit) {

		CanvasKit.Extenders = {
			numeric : function(target, precision) {
				var result = ko.computed({
					read : target, //always return the original observables value
					write : function(newValue) {
						var current = target(),
					    roundingMultiplier = Math.pow(10, precision),
					    newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue),
					    valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

						//only write if it changed
						if (valueToWrite !== current) {
							target(valueToWrite);
						} else {
							//if the rounded value is the same, but a different value was written, force a notification for the current field
							if (newValue !== current) {
								target.notifySubscribers(valueToWrite);
							}
						}
					}
				}).extend({
					notify : 'always'
				});

				//initialize with current value to make sure it is rounded appropriately
				result(target());

				//return the new computed observable
				return result;
			}
		};
		//register
		ko.extenders.numeric = CanvasKit.Extenders.numeric;
		return CanvasKit;

	}(window.CanvasKit || {}));
