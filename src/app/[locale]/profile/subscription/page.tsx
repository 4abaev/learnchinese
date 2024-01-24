import SubscriptionList from '@/components/subscriptionList/subscriptionList';
import { metadataGenerator } from '@/utils/metadataGenerator';



export async function generateMetadata() {
   return metadataGenerator('subscription');
};

export default async function Subscription() {
    return <SubscriptionList />;
}
