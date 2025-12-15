import React from "react";

export default function ProductList() {
  return (
    <div>
      <a href="/add-product">افزودن محصول جدید</a>
      <div>
        <table>
          <th>
            <td>تصویر</td>
            <td>نام محصول</td>
            <td>قیمت</td>
            <td>موجودی</td>
            <td>عملیات</td>
          </th>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  );
}
