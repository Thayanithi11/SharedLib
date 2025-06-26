import SliderSection from './SliderSection';

export default function Feed({peopleNearYou,bookReviews}){
 
  return (
    <div className="p-4">
      <SliderSection title="Find People in your Locality" items={peopleNearYou} viewAllPath="/home/people" />
      <SliderSection title="Book Reviews" items={bookReviews} viewAllPath="/home/reviews" />
    </div>
  );
};


