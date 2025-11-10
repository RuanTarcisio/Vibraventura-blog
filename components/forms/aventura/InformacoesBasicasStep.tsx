// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// // import { Input } from '@/components/ui/Input';
// // import { Textarea } from '@/components/ui/Textarea';

// export function InformacoesBasicasStep() {
//     return (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-900">Informações Básicas</h2>

//             <FormField
//                 name="titulo"
//                 render={({ field }) => (
//                     <FormItem>
//                         <FormLabel>Título da Aventura</FormLabel>
//                         <FormControl>
//                             <Input placeholder="Ex: Trekking na Serra do Mar" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />

//             <FormField
//                 name="descricao"
//                 render={({ field }) => (
//                     <FormItem>
//                         <FormLabel>Descrição Detalhada</FormLabel>
//                         <FormControl>
//                             <Textarea
//                                 placeholder="Descreva sua aventura em detalhes..."
//                                 rows={6}
//                                 {...field}
//                             />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />

//             <FormField
//                 name="fraseImpacto"
//                 render={({ field }) => (
//                     <FormItem>
//                         <FormLabel>Frase de Impacto (Opcional)</FormLabel>
//                         <FormControl>
//                             <Input
//                                 placeholder="Ex: Uma experiência inesquecível na natureza!"
//                                 {...field}
//                             />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />
//         </div>
//     );
// }