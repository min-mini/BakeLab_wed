package com.bread.bakelab.domains.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PurchaseVO {
    String order_number;
    String product_name;
    int count;
}
