export default function ConfirmModal({
open,
title,
message,
onConfirm,
onCancel
}){


if(!open)
return null;



return (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


<div className="bg-white rounded-xl shadow-xl p-8 w-96">


<h2 className="text-2xl font-bold mb-3">
{title}
</h2>


<p className="text-gray-500 mb-6">
{message}
</p>



<div className="flex justify-end gap-3">


<button

onClick={onCancel}

className="px-5 py-2 rounded-lg border"

>

Cancel

</button>



<button

onClick={onConfirm}

className="px-5 py-2 rounded-lg bg-red-600 text-white"

>

Delete

</button>


</div>



</div>


</div>


)

}