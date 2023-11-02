package com.bread.bakelab.mapper;

import com.bread.bakelab.domains.dto.ProductDTO;
import com.bread.bakelab.domains.vo.ProductVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {
    List<ProductDTO> get_all_products(@Param("search") String search, @Param("category")String category);
    ProductDTO get_product(String product_name);
    void delete_images(String product_name);
    void update_product(ProductVO productVO);

    void update_product_stock(@Param("count") int count, @Param("product_name")String product_name);



}
