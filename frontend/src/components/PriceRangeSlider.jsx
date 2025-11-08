import { useState, useEffect } from 'react';

function PriceRangeSlider({ min = 0, max = 60000, value, onChange }) {
  const [minValue, setMinValue] = useState(value?.min || min);
  const [maxValue, setMaxValue] = useState(value?.max || max);

  useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxValue - 500);
    setMinValue(newMin);
    onChange({ min: newMin, max: maxValue });
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minValue + 500);
    setMaxValue(newMax);
    onChange({ min: minValue, max: newMax });
  };

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="px-1">
      <div className="mb-4">
        <div className="flex justify-between text-sm font-semibold text-gray-700 mb-3">
          <span className="text-blue-600">₹{minValue.toLocaleString('en-IN')}</span>
          <span className="text-blue-600">₹{maxValue.toLocaleString('en-IN')}</span>
        </div>
        
        <div className="relative h-2">
          {/* Track Background */}
          <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
          
          {/* Active Range */}
          <div
            className="absolute h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          ></div>
          
          {/* Min Slider */}
          <input
            type="range"
            min={min}
            max={max}
            step="500"
            value={minValue}
            onChange={handleMinChange}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none z-10 slider-thumb"
            style={{ zIndex: minValue > max - 5000 ? 5 : 3 }}
          />
          
          {/* Max Slider */}
          <input
            type="range"
            min={min}
            max={max}
            step="500"
            value={maxValue}
            onChange={handleMaxChange}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none z-10 slider-thumb"
            style={{ zIndex: 4 }}
          />
        </div>
      </div>
      
      {/* Min/Max Labels */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>₹{min.toLocaleString('en-IN')}</span>
        <span>₹{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
