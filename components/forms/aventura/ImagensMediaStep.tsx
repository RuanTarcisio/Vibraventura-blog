// // components/form-steps/ImagensMediaStep.tsx
// import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { ImageUpload } from '@/components/ui/ImageUpload';

// export function ImagensMediaStep() {
//     return (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-900">Imagens da Aventura</h2>

//             <FormField
//                 name="urlsImagensAventura"
//                 render={({ field }) => (
//                     <FormItem>
//                         <FormLabel>Upload de Imagens</FormLabel>
//                         <ImageUpload
//                             value={field.value || []}
//                             onChange={field.onChange}
//                             maxFiles={10}
//                         />
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />
//         </div>
//     );
// }    